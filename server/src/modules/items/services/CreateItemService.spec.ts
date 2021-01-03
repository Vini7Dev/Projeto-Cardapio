/**
 * Test: Create Item Service
 */

import CreateItemService from './CreateItemService';
import CreateRestaurantService from '../../restaurants/services/CreateRestaurantService';

import FakeItemsRepository from '../repositories/fakes/FakeItemsRepository';
import IItemsRepository from '../repositories/IItemsRepository';

import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

import FakeRestaurantsRepository from '../../restaurants/repositories/fakes/FakeRestaurantsRepository';
import IRestaurantsRepository from '../../restaurants/repositories/IRestaurantsRepository';

import FakeMenusRepository from '../../menus/repositories/fakes/FakeMenusRepository';
import IMenusRepository from '../../menus/repositories/IMenusRepository';

import FakeMenuItemsRepository from '../../menus/repositories/fakes/FakeMenuItemsRepository';
import IMenuItemsRepository from '../../menus/repositories/IMenuItemsRepository';

import FakeHashProvider from '../../restaurants/providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../../restaurants/providers/HashProvider/models/IHashProvider';

import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';

import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '../../../shared/errors/AppError';

let createItemService: CreateItemService;
let createRestaurantService: CreateRestaurantService;

let itemsRepository: IItemsRepository;
let categoriesRepository: ICategoriesRepository;
let restaurantsRepository: IRestaurantsRepository;
let menusRepository: IMenusRepository;
let menuItemsRepository: IMenuItemsRepository;
let hashProvider: IHashProvider;
let storageProvider: IStorageProvider;
let cacheProvider: ICacheProvider;

describe('CreateItemService', () => {
    // Instantiate services for each test
    beforeEach(() => {
        itemsRepository = new FakeItemsRepository();
        categoriesRepository = new FakeCategoriesRepository();
        restaurantsRepository = new FakeRestaurantsRepository();
        menusRepository = new FakeMenusRepository();
        menuItemsRepository = new FakeMenuItemsRepository();
        hashProvider = new FakeHashProvider();
        storageProvider = new FakeStorageProvider();
        cacheProvider = new FakeCacheProvider();

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

    it('should be able to create a new item', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Creating a new item
        const itemAndMenuItem = await createItemService.execute({
            image: 'image.png',
            title: 'Food Title',
            description: 'Food Description',
            price: 10,
            discount_price: 0,
            enabled: true,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        });

        // Check if item has been created
        expect(itemAndMenuItem).toHaveProperty('item');
        expect(itemAndMenuItem).toHaveProperty('menu_item');
    });

    it('should be able to create a new item without image', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Creating a new item
        const itemAndMenuItem = await createItemService.execute({
            title: 'Food Title',
            description: 'Food Description',
            price: 10,
            discount_price: 0,
            enabled: true,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        });

        // Check if item has been created
        expect(itemAndMenuItem).toHaveProperty('item');
        expect(itemAndMenuItem.item.image).toEqual(undefined);
    });

    it('should be able to create a new item reusing the registered category', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Creating a first item
        const firstItemCreated = await createItemService.execute({
            image: 'image.png',
            title: 'Food Title',
            description: 'Food Description',
            price: 10,
            discount_price: 0,
            enabled: true,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        });

        // Creating a second item
        const secondItemCreated = await createItemService.execute({
            image: 'image.png',
            title: 'Other Food Title',
            description: 'Food Description',
            price: 15,
            discount_price: 10,
            enabled: true,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        });

        // Check if item has been created
        expect(firstItemCreated).toHaveProperty('item');
        expect(secondItemCreated).toHaveProperty('menu_item');

        // Check if reuse the category saved
        expect(secondItemCreated.item.category_id).toEqual(
            firstItemCreated.item.category_id,
        );
    });

    it('should not be able to create a new item with non-exists restaurant', async () => {
        // Try to create a new item with non-exists restaurant
        await expect(
            createItemService.execute({
                image: 'image.png',
                title: 'Food Title',
                description: 'Food Description',
                price: 10,
                discount_price: 0,
                enabled: true,
                category_name: 'Category 1',
                restaurant_id: 'non-exsists-restaurant',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
