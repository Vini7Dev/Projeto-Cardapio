/**
 * Test: Update Profile Data Service
 */

import UpdateProfileDataService from './UpdateProfileDataService';
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

let updateProfileDataService: UpdateProfileDataService;
let createRestaurantService: CreateRestaurantService;

let restaurantsRepository: IRestaurantsRepository;
let menusRepository: IMenusRepository;
let hashProvider: IHashProvider;
let storageProvider: IStorageProvider;

describe('UpdateProfileDataService', () => {
    // Instantiate services for each test
    beforeEach(() => {
        restaurantsRepository = new FakeRestaurantsRepository();
        menusRepository = new FakeMenusRepository();
        hashProvider = new FakeHashProvider();
        storageProvider = new FakeStorageProvider();

        updateProfileDataService = new UpdateProfileDataService(
            restaurantsRepository,
            hashProvider,
            storageProvider,
        );

        createRestaurantService = new CreateRestaurantService(
            restaurantsRepository,
            menusRepository,
            hashProvider,
            storageProvider,
        );
    });

    it('should be able to update profile data', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Updating the restaurant's data
        const updatedRestaurant = await updateProfileDataService.execute({
            restaurant_id: restaurant.id,
            trade: 'Restaurant-Update',
            telephone: '22222222222',
            logo: 'logo-update.png',
            new_password: 'pass-update',
            current_password: 'pass123',
        });

        // Verigfy if the restaurant's data has ben updated
        expect(updatedRestaurant.trade).toBe('Restaurant-Update');
        expect(updatedRestaurant.telephone).toBe('22222222222');
        expect(updatedRestaurant.logo).toBe('logo-update.png');
        expect(updatedRestaurant.password).toBe('pass-update');
    });

    it('should be able to update restaurant data with all logo file extensions accepted', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Updating the restaurant's data
        const updatedRestaurantPNG = await updateProfileDataService.execute({
            restaurant_id: restaurant.id,
            trade: 'Restaurant-UpdatePNG',
            telephone: '22222222222',
            logo: 'logo-update.png',
            current_password: 'pass123',
        });

        // Verigfy if the restaurant's logo has ben updated
        expect(updatedRestaurantPNG.logo).toEqual('logo-update.png');


        // Updating the restaurant's data
        const updatedRestaurantJPG = await updateProfileDataService.execute({
            restaurant_id: restaurant.id,
            trade: 'Restaurant-UpdateJPG',
            telephone: '22222222222',
            logo: 'logo-update.jpg',
            current_password: 'pass123',
        });

        // Verigfy if the restaurant's logo has ben updated
        expect(updatedRestaurantJPG.logo).toEqual('logo-update.jpg');

        // Updating the restaurant's data
        const updatedRestaurantJPEG = await updateProfileDataService.execute({
            restaurant_id: restaurant.id,
            trade: 'Restaurant-UpdateJPEG',
            telephone: '22222222222',
            logo: 'logo-update.jpeg',
            current_password: 'pass123',
        });

        // Verigfy if the restaurant's logo has ben updated
        expect(updatedRestaurantJPEG.logo).toEqual('logo-update.jpeg');
    });

    it('should not be able to update restaurant with invalid file extensions', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Try to update restaurant with a invalid logo extensions
        await expect(
            updateProfileDataService.execute({
                restaurant_id: restaurant.id,
                trade: 'Restaurant-Update',
                telephone: '22222222222',
                logo: 'logo-update.txt',
                new_password: 'pass-update',
                current_password: 'pass123',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update profile data without update the logo', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Updating the restaurant's data without update logo
        const updatedRestaurant = await updateProfileDataService.execute({
            restaurant_id: restaurant.id,
            trade: 'Restaurant-Update',
            telephone: '22222222222',
            logo: 'logo.png',
            new_password: 'pass-update',
            current_password: 'pass123',
        });

        // Verigfy if the restaurant's data has ben updated
        expect(updatedRestaurant.trade).toBe('Restaurant-Update');
        expect(updatedRestaurant.logo).toBe('logo.png');
    });

    it('should be able to update profile data without update the password', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Updating the restaurant's data without update password
        const updatedRestaurant = await updateProfileDataService.execute({
            restaurant_id: restaurant.id,
            trade: 'Restaurant-Update',
            telephone: '22222222222',
            logo: 'logo.png',
            current_password: 'pass123',
        });

        // Verigfy if the restaurant's data has ben updated
        expect(updatedRestaurant.trade).toBe('Restaurant-Update');
        expect(updatedRestaurant.password).toBe('pass123');
    });

    it('should not be able to update data for a non-existent restaurant', async () => {
        // Try to update data for a non-existent restaurant
        await expect(
            updateProfileDataService.execute({
                restaurant_id: 'non-existent id',
                trade: 'Restaurant-Update',
                telephone: '22222222222',
                logo: 'logo-update.png',
                new_password: 'pass-update',
                current_password: 'pass123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update data for a restaurant with invalid credentials', async () => {
        // Creating a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Try to updating the restaurant's data with wrong password
        await expect(
            updateProfileDataService.execute({
                restaurant_id: restaurant.id,
                trade: 'Restaurant-Update',
                telephone: '22222222222',
                logo: 'logo-update.png',
                new_password: 'pass-update',
                current_password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
