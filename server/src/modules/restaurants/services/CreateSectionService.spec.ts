/**
 * Test: Create Section Service
 */

import AppError from '../../../shared/errors/AppError';
import CreateSectionService from './CreateSectionService';
import CreateRestaurantService from './CreateRestaurantService';

import FakeRestaurantsRepository from '../repositories/fakes/FakeRestaurantsRepository';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import FakeMenusRepository from '../../menus/repositories/fakes/FakeMenusRepository';
import IMenusRepository from '../../menus/repositories/IMenusRepository';

import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';

let createSectionService: CreateSectionService;
let createRestaurantService: CreateRestaurantService;
let restaurantsRepository: IRestaurantsRepository;
let hashProvider: IHashProvider;
let menusReppository: IMenusRepository;
let storageProvider: IStorageProvider;

describe('CreateSectionService', () => {
    // Instantiate services for each test
    beforeEach(() => {
        restaurantsRepository = new FakeRestaurantsRepository();
        hashProvider = new FakeHashProvider();
        menusReppository = new FakeMenusRepository();
        storageProvider = new FakeStorageProvider();

        createSectionService = new CreateSectionService(
            restaurantsRepository,
            hashProvider,
        );

        createRestaurantService = new CreateRestaurantService(
            restaurantsRepository,
            menusReppository,
            hashProvider,
            storageProvider,
        );
    });

    it('shold be able to authenticate', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Try to create a new section with restaurant's credentials
        const response = await createSectionService.execute({
            email: restaurant.email,
            password: restaurant.password,
        });

        // Verify the service response
        expect(response).toHaveProperty('token');
        expect(response.restaurant).toEqual(restaurant);
    });

    it('shuld not be able to create a new section with non exists restaurant.', async () => {
        // Try to create a new section with non registered restaurant
        await expect(
            createSectionService.execute({
                email: 'non-exists-email',
                password: 'non-exists-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new section with wrong credentials', async () => {
        // Creating a new restaurant
        await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Try to create a new section with wrong credentials
        await expect(
            createSectionService.execute({
                email: 'example@mail.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
