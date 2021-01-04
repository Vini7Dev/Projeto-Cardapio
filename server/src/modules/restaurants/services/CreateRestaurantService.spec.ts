/**
 * Test: Create Restaurant
 */

import CreateRestaurantService from './CreateRestaurantService';

import FakeRestaurantsRepository from '../repositories/fakes/FakeRestaurantsRepository';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

import FakeMenusRepository from '../../menus/repositories/fakes/FakeMenusRepository';
import IMenusRepository from '../../menus/repositories/IMenusRepository';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';

import AppError from '../../../shared/errors/AppError';

let createRestaurantService: CreateRestaurantService;

let restaurantsRepository: IRestaurantsRepository;
let menusRepository: IMenusRepository;
let hashProvider: IHashProvider;
let storageProvider: IStorageProvider;

describe('CreateRestaurantService', () => {
    // Instantiate service for each test
    beforeEach(() => {
        restaurantsRepository = new FakeRestaurantsRepository();
        menusRepository = new FakeMenusRepository();
        hashProvider = new FakeHashProvider();
        storageProvider = new FakeStorageProvider();

        createRestaurantService = new CreateRestaurantService(
            restaurantsRepository,
            menusRepository,
            hashProvider,
            storageProvider,
        );
    });

    it('should be able to create a new restaurant', async () => {
        // Create a new restaurant
        const restaurantCreated = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '12345678910',
            telephone: '99123456789',
            logo: 'logo.png',
            email: 'example@gmail.com',
            password: 'pass123',
        });

        // Expects to have been created
        expect(restaurantCreated).toHaveProperty('id');
    });

    it('should be able to create a new restaurant with all logo file extensions accepted', async () => {
        // Create a new restaurant with logo.png
        const restaurantCreatedPNG = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'examplePNG@gmail.com',
            password: 'pass123',
        });
        // Create a new restaurant with logo.png
        const restaurantCreatedJPG = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '22222222222',
            telephone: '22222222222',
            logo: 'logo.jpg',
            email: 'exampleJPG@gmail.com',
            password: 'pass123',
        });

        // Create a new restaurant with logo.png
        const restaurantCreatedJPEG = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '33333333333',
            telephone: '33333333333',
            logo: 'logo.jpeg',
            email: 'exampleJPEG@gmail.com',
            password: 'pass123',
        });

        // Expects to have been created with accepted extensions
        expect(restaurantCreatedPNG.logo).toEqual('logo.png');
        expect(restaurantCreatedJPG.logo).toEqual('logo.jpg');
        expect(restaurantCreatedJPEG.logo).toEqual('logo.jpeg');
    })

    it('should not be able to create a new restaurant with invalid file extensions', async () => {
        // Try to create a new restaurant with a invalid logo extensions
        await expect(
            createRestaurantService.execute({
                trade: 'Restaurant',
                cnpj: '11111111111',
                telephone: '11111111111',
                logo: 'logo.txt',
                email: 'examplePNG@gmail.com',
                password: 'pass123',
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('should be able to create a new restaurant without the logo', async () => {
        // Create a new restaurant
        const restaurantCreated = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '12345678910',
            telephone: '99123456789',
            email: 'example@gmail.com',
            password: 'pass123',
        });

        // Expects to have been created
        expect(restaurantCreated).toHaveProperty('id');
        expect(restaurantCreated.logo).toEqual(undefined);
    });

    it('should not be able to create a new restaurant with an already registered email', async () => {
        // Create a new restaurant
        await createRestaurantService.execute({
            trade: 'Restaurant 1',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo1.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Create other restaurant with a same email
        await expect(
            createRestaurantService.execute({
                trade: 'Restaurant 2',
                cnpj: '22222222222',
                telephone: '22222222222',
                logo: 'logo2.png',
                email: 'example@mail.com',
                password: 'pass456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new restaurant with an already registered CNPJ', async () => {
        // Create a new restaurant
        await createRestaurantService.execute({
            trade: 'Restaurant 1',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo1.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Create other restaurant with a same CNPJ
        await expect(
            createRestaurantService.execute({
                trade: 'Restaurant 2',
                cnpj: '11111111111',
                telephone: '22222222222',
                logo: 'logo2.png',
                email: 'example2@mail.com',
                password: 'pass456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
