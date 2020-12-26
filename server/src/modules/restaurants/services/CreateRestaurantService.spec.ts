/**
 * Test: Create Restaurant
 */

import CreateRestaurantService from './CreateRestaurantService';

import FakeRestaurantsRepository from '../repositories/fakes/FakeRestaurantsRepository';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

import FakeMenusRepository from '../../menu/repositories/fakes/FakeMenusRepository';
import IMenusRepository from '../../menu/repositories/IMenusRepository';

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
        // Restaurant form data;

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
