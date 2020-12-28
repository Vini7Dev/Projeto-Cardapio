/**
 * Test: Update Item Service
 */

import UpdateItemService from './UpdateItemService';
import CreateItemService from './CreateItemService';
import CreateRestaurantService from '../../restaurants/services/CreateRestaurantService';

import FakeItemsRepository from '../repositories/fakes/FakeItemsRepository';
import IItemsRepository from '../repositories/IItemsRepository';

import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

import FakeRestaurantsRepository from '../../restaurants/repositories/fakes/FakeRestaurantsRepository';
import IRestaurantsRepository from '../../restaurants/repositories/IRestaurantsRepository';

import FakeMenusRepository from '../../menu/repositories/fakes/FakeMenusRepository';
import IMenusRepository from '../../menu/repositories/IMenusRepository';

import FakeMenuItemsRepository from '../../menu/repositories/fakes/FakeMenuItemsRepository';
import IMenuItemsRepository from '../../menu/repositories/IMenuItemsRepository';

import FakeHashProvider from '../../restaurants/providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../../restaurants/providers/HashProvider/models/IHashProvider';

import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';

import AppError from '../../../shared/errors/AppError';

let updateItemService: UpdateItemService;
let createItemService: CreateItemService;
let createRestaurantService: CreateRestaurantService;

let itemsRepository: IItemsRepository;
let categoriesRepository: ICategoriesRepository;
let restaurantsRepository: IRestaurantsRepository;
let menusRepository: IMenusRepository;
let menuItemsRepository: IMenuItemsRepository;
let hashProvider: IHashProvider;
let storageProvider: IStorageProvider;

describe('UpdateItemService', () => {
    // Instantiate services for each test
    beforeEach(() => {
        itemsRepository = new FakeItemsRepository();
        categoriesRepository = new FakeCategoriesRepository();
        restaurantsRepository = new FakeRestaurantsRepository();
        menusRepository = new FakeMenusRepository();
        menuItemsRepository = new FakeMenuItemsRepository();
        hashProvider = new FakeHashProvider();
        storageProvider = new FakeStorageProvider();

        updateItemService = new UpdateItemService(
            itemsRepository,
            categoriesRepository,
            restaurantsRepository,
            storageProvider,
        );

        createItemService = new CreateItemService(
            itemsRepository,
            categoriesRepository,
            restaurantsRepository,
            menuItemsRepository,
            storageProvider,
        );

        createRestaurantService = new CreateRestaurantService(
            restaurantsRepository,
            menusRepository,
            hashProvider,
            storageProvider,
        );
    });

    it("should be able to update an item's data", async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@gmail.com',
            password: 'pass123',
        });

        // Creating a new item
        const itemCreated = await createItemService.execute({
            image: 'image1.png',
            title: 'Food Title',
            description: 'Food Description',
            price: 10,
            discount_price: 0,
            enabled: true,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        });

        // Update item created data (without change category)
        const itemUpdated = await updateItemService.execute({
            item_id: itemCreated.item.id,
            image: 'image2.png',
            title: 'Food Updated',
            description: 'Food Description Updated',
            price: 15,
            discount_price: 11,
            enabled: false,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        });

        // Verify if has been updated (without change category)
        expect(itemUpdated.title).toEqual('Food Updated');

        // Update item data again (changing category)
        const itemCategoryUpdated = await updateItemService.execute({
            item_id: itemCreated.item.id,
            image: 'image2.png',
            title: 'Food Updated Again',
            description: 'Food Description Updated',
            price: 15,
            discount_price: 11,
            enabled: false,
            category_name: 'Category 2',
            restaurant_id: restaurant.id,
        });

        // Verify if has been updated (changing category)
        expect(itemCategoryUpdated.title).toEqual('Food Updated Again');
    });

    it('should not be able to update item when restaurant non-exists', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@gmail.com',
            password: 'pass123',
        });

        // Creating a new item
        const itemCreated = await createItemService.execute({
            image: 'image1.png',
            title: 'Food Title',
            description: 'Food Description',
            price: 10,
            discount_price: 0,
            enabled: true,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        });

        // Try to update item data with invalid restaurant id
        await expect(
            updateItemService.execute({
                item_id: itemCreated.item.id,
                image: 'image2.png',
                title: 'Food Updated',
                description: 'Food Description Updated',
                price: 15,
                discount_price: 11,
                enabled: false,
                category_name: 'Category 2',
                restaurant_id: 'non-exists-restaurant',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('it should not be able to update item when it non-exists', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@gmail.com',
            password: 'pass123',
        });

        // Try to update item data with non-exists item
        await expect(
            updateItemService.execute({
                item_id: 'non-exists-item',
                image: 'image2.png',
                title: 'Food Updated',
                description: 'Food Description Updated',
                price: 15,
                discount_price: 11,
                enabled: false,
                category_name: 'Category 2',
                restaurant_id: restaurant.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update item with unauthorized user (when is not the owner).', async () => {
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

        // Try to update item with an unauthorized restaurant
        await expect(
            updateItemService.execute({
                item_id: itemCreated.item.id,
                image: 'image2.png',
                title: 'Food Updated',
                description: 'Food Description Updated',
                price: 15,
                discount_price: 11,
                enabled: false,
                category_name: 'Category 2',
                restaurant_id: restaurantUnauthorized.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
