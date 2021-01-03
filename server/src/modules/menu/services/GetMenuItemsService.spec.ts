/**
 * Test: Get Menu Items Service
 */

import AppError from '../../../shared/errors/AppError';

import MenuItem from '../typeorm/entities/MenuItem';

import GetMenuItemsService from './GetMenuItemsService';
import CreateItemService from '../../items/services/CreateItemService';
import CreateRestaurantService from '../../restaurants/services/CreateRestaurantService';

import IMenusRepository from '../repositories/IMenusRepository';
import FakeMenusRepository from '../repositories/fakes/FakeMenusRepository';

import IMenuItemsRepository from '../repositories/IMenuItemsRepository';
import FakeMenuItemsRepository from '../repositories/fakes/FakeMenuItemsRepository';

import IItemsRepository from '../../items/repositories/IItemsRepository';
import FakeItemsRepository from '../../items/repositories/fakes/FakeItemsRepository';

import ICategoriesRepository from '../../items/repositories/ICategoriesRepository';
import FakeCategoriesRepository from '../../items/repositories/fakes/FakeCategoriesRepository';

import IRestaurantsRepository from '../../restaurants/repositories/IRestaurantsRepository';
import FakeRestaurantsRepository from '../../restaurants/repositories/fakes/FakeRestaurantsRepository';

import IHashProvider from '../../restaurants/providers/HashProvider/models/IHashProvider';
import FakeHashProvider from '../../restaurants/providers/HashProvider/fakes/FakeHashProvider';

import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let getMenuItemsService: GetMenuItemsService;
let createItemService: CreateItemService;
let createRestaurantService: CreateRestaurantService;

let menusRepository: IMenusRepository;
let menuItemsRepository: IMenuItemsRepository;
let itemsRepository: IItemsRepository;
let categoriesRepository: ICategoriesRepository;
let restaurantsRepository: IRestaurantsRepository;
let hashProvider: IHashProvider;
let storageProvider: IStorageProvider;
let cacheProvider: ICacheProvider;

describe('GetMenuItemsService', () => {
    // Instantiate the services before each test
    beforeEach(() => {
        menusRepository = new FakeMenusRepository();
        menuItemsRepository = new FakeMenuItemsRepository();
        itemsRepository = new FakeItemsRepository();
        categoriesRepository = new FakeCategoriesRepository();
        restaurantsRepository = new FakeRestaurantsRepository();
        hashProvider = new FakeHashProvider();
        storageProvider = new FakeStorageProvider();
        cacheProvider = new FakeCacheProvider();

        getMenuItemsService = new GetMenuItemsService(
            menusRepository,
            menuItemsRepository,
            cacheProvider,
        );

        createItemService = new CreateItemService(
            itemsRepository,
            categoriesRepository,
            restaurantsRepository,
            menuItemsRepository,
            storageProvider,
            cacheProvider,
        );

        createRestaurantService = new CreateRestaurantService(
            restaurantsRepository,
            menusRepository,
            hashProvider,
            storageProvider,
        );
    });

    it('should be able to list menu items', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Creating items to menu
        const foodData = {
            image: 'image.png',
            title: 'Food Title',
            description: 'Food Description',
            price: 10,
            discount_price: 0,
            enabled: true,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        };

        // Saving items in menu
        await createItemService.execute(foodData);
        await createItemService.execute(foodData);

        // Getting menu items
        const menuItems = await getMenuItemsService.execute(
            Number(restaurant.menu_id),
        );

        // Check if response is not undefined
        expect(menuItems).not.toEqual(undefined);
    });

    it('should be able to list menu items from cache data', async () => {
        // Spy method to recover cache data
        const recoverCache = jest.spyOn(cacheProvider, 'recover');

        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Creating items to menu
        const foodData = {
            image: 'image.png',
            title: 'Food Title',
            description: 'Food Description',
            price: 10,
            discount_price: 0,
            enabled: true,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        };

        // Saving items in menu
        const menuItemSaved1 = await createItemService.execute(foodData);
        const menuItemSaved2 = await createItemService.execute(foodData);

        // Getting menu items in first time (from data base)
        await getMenuItemsService.execute(Number(restaurant.menu_id));

        // Getting menu items in second time (from cache)
        await getMenuItemsService.execute(Number(restaurant.menu_id));

        // Expect recover return the cache
        expect(recoverCache.mock.results[0].value).toEqual(
            new Promise(resolve => resolve({})),
        );
        expect(recoverCache.mock.results[1].value).toEqual(
            new Promise(resolve => resolve({ menuItemSaved1, menuItemSaved2 })),
        );
    });

    it('should not be able to list menu items from a non-exists menu', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Creating items to menu
        const foodData = {
            image: 'image.png',
            title: 'Food Title',
            description: 'Food Description',
            price: 10,
            discount_price: 0,
            enabled: true,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        };

        // Saving items in menu
        await createItemService.execute(foodData);
        await createItemService.execute(foodData);

        // Try to get menu items from a non-exists menu
        await expect(
            getMenuItemsService.execute(9999999999),
        ).rejects.toBeInstanceOf(AppError);
    });
});
