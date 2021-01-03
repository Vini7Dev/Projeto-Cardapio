/**
 * Test: Delete Item Service
 */

import AppError from '../../../shared/errors/AppError';

import DeleteItemService from './DeleteItemService';
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

let deleteItemService: DeleteItemService;
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

describe('DeleteItemService', () => {
    beforeEach(() => {
        itemsRepository = new FakeItemsRepository();
        categoriesRepository = new FakeCategoriesRepository();
        restaurantsRepository = new FakeRestaurantsRepository();
        menusRepository = new FakeMenusRepository();
        menuItemsRepository = new FakeMenuItemsRepository();
        hashProvider = new FakeHashProvider();
        storageProvider = new FakeStorageProvider();
        cacheProvider = new FakeCacheProvider();

        deleteItemService = new DeleteItemService(
            itemsRepository,
            restaurantsRepository,
            storageProvider,
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

    it('should be able to delete item', async () => {
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
        const item = await createItemService.execute({
            image: 'image.png',
            title: 'Food Title',
            description: 'Food Description',
            price: 10,
            discount_price: 0,
            enabled: true,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        });

        // Deleting item
        await deleteItemService.execute({
            restaurant_id: restaurant.id,
            item_id: item.item.id,
        });

        // Try to find item deleted
        const noExistsItem = await itemsRepository.findById(item.item.id);

        // Expect not to find the item
        expect(noExistsItem).toEqual(undefined);
    });

    it('should be able to delete item without image', async () => {
        // Spy delete file method
        const deleteFile = jest.spyOn(storageProvider, 'deleteFile');

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
        const item = await createItemService.execute({
            title: 'Food Title',
            description: 'Food Description',
            price: 10,
            discount_price: 0,
            enabled: true,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        });

        // Deleting item
        await deleteItemService.execute({
            restaurant_id: restaurant.id,
            item_id: item.item.id,
        });

        // Try to find item deleted
        const noExistsItem = await itemsRepository.findById(item.item.id);

        // Expect not to find the item and not have called the method 'deleteFile'
        expect(noExistsItem).toEqual(undefined);
        expect(deleteFile).not.toHaveBeenCalledWith(item.item.image);
    });

    it('should not be able to delete a item with non-exists restaurant', async () => {
        // Try to delete a item with non-exists restaurant
        await expect(
            deleteItemService.execute({
                restaurant_id: 'non-exists-restaurant',
                item_id: 'non-exists-item',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to delete a non-exists item', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Try to delete a non-exists item
        await expect(
            deleteItemService.execute({
                restaurant_id: restaurant.id,
                item_id: 'non-exists-item',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to delete item with unauthorized user (when is not the owner', async () => {
        // Creating restaurant owner
        const restaurantOwner = await createRestaurantService.execute({
            trade: 'Restaurant Owner',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'owner@gmail.com',
            password: 'pass123',
        });

        // Creating a unauthorized restaurant
        const restaurantUnauthorized = await createRestaurantService.execute({
            trade: 'Restaurant Unauthorized',
            cnpj: '22222222222',
            telephone: '22222222222',
            logo: 'logo.png',
            email: 'unauthorized@gmail.com',
            password: 'pass123',
        });

        // Creating item
        const itemCreated = await createItemService.execute({
            image: 'image1.png',
            title: 'Food Title',
            description: 'Food Description',
            price: 10,
            discount_price: 0,
            enabled: true,
            category_name: 'Category 1',
            restaurant_id: restaurantOwner.id,
        });

        // Try to delete item with an unauthorized restaurant
        await expect(
            deleteItemService.execute({
                restaurant_id: restaurantUnauthorized.id,
                item_id: itemCreated.item.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
