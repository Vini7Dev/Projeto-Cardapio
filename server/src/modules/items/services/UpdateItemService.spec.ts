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
let cacheProvider: ICacheProvider;

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
        cacheProvider = new FakeCacheProvider();

        updateItemService = new UpdateItemService(
            itemsRepository,
            categoriesRepository,
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

    it("sshould be able to update item with all image file extensions accepted", async () => {
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

        // Update item created data PNG
        const itemUpdatedPNG = await updateItemService.execute({
            item_id: itemCreated.item.id,
            image: 'image.png',
            title: 'Food Updated',
            description: 'Food Description Updated',
            price: 15,
            discount_price: 11,
            enabled: false,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        });

        // Verify if has been updated PNG
        expect(itemUpdatedPNG.image).toEqual('image.png');

        // Update item data again JPG
        const itemUpdatedJPG = await updateItemService.execute({
            item_id: itemCreated.item.id,
            image: 'image.jpg',
            title: 'Food Updated Again',
            description: 'Food Description Updated',
            price: 15,
            discount_price: 11,
            enabled: false,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        });

        // Verify if has been updated JPG
        expect(itemUpdatedJPG.image).toEqual('image.jpg');

        // Update item data again PPEG
        const itemUpdatedJPEG = await updateItemService.execute({
            item_id: itemCreated.item.id,
            image: 'image.jpeg',
            title: 'Food Updated Again',
            description: 'Food Description Updated',
            price: 15,
            discount_price: 11,
            enabled: false,
            category_name: 'Category 1',
            restaurant_id: restaurant.id,
        });

        // Verify if has been updated PPEG
        expect(itemUpdatedJPEG.image).toEqual('image.jpeg');
    });

    it('should not be able to update item with invalid file extensions', async () => {
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

        // Try to create a new item with a invalid image extensions
        await expect(
            updateItemService.execute({
                item_id: itemCreated.item.id,
                image: 'image.txt',
                title: 'Food Title Updated',
                description: 'Food Description Updated',
                price: 10,
                discount_price: 0,
                enabled: true,
                category_name: 'Category 1',
                restaurant_id: restaurant.id,
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to update an item's data without update image", async () => {
        // Spy save file method
        const saveFile = jest.spyOn(storageProvider, 'saveFile');

        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            email: 'example@gmail.com',
            password: 'pass123',
        });

        // Creating a new item
        const itemCreated = await createItemService.execute({
            title: 'Food Title',
            description: 'Food Description',
            price: 10,
            discount_price: 0,
            enabled: true,
            category_name: 'Category',
            restaurant_id: restaurant.id,
        });

        // Update item created data without change image
        const itemUpdated = await updateItemService.execute({
            item_id: itemCreated.item.id,
            title: 'Food Updated',
            description: 'Food Description Updated',
            price: 15,
            discount_price: 11,
            enabled: false,
            category_name: 'Category',
            restaurant_id: restaurant.id,
        });

        // Verify if has been updated (without change category)
        expect(itemUpdated.title).toEqual('Food Updated');
        expect(saveFile).not.toHaveBeenCalled();
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
