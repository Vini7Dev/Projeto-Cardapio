/**
 * Test: Get Profile Data Service
 */

import GetProfileDataService from './GetProfileDataService';
import CreateRestaurantService from './CreateRestaurantService';

import FakeRestaurantsRepository from '../repositories/fakes/FakeRestaurantsRepository';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

import FakeMenusRepository from '../../menus/repositories/fakes/FakeMenusRepository';
import IMenusRepository from '../../menus/repositories/IMenusRepository';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';

let getProfileDataService: GetProfileDataService;
let createRestaurantService: CreateRestaurantService;
let restaurantsRepository: IRestaurantsRepository;
let menusRepository: IMenusRepository;
let hashProvider: IHashProvider;
let storageProvider: IStorageProvider;

describe('GetProfileDataService', () => {
    // Instantiate services for each test
    beforeEach(() => {
        restaurantsRepository = new FakeRestaurantsRepository();
        menusRepository = new FakeMenusRepository();
        hashProvider = new FakeHashProvider();
        storageProvider = new FakeStorageProvider();

        getProfileDataService = new GetProfileDataService(
            restaurantsRepository,
        );

        createRestaurantService = new CreateRestaurantService(
            restaurantsRepository,
            menusRepository,
            hashProvider,
            storageProvider,
        );
    });

    it('should be able to get data from a specific profile', async () => {
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@mail.com',
            password: 'pass123',
        });

        const restaurantFinded = await getProfileDataService.execute(
            restaurant.id,
        );

        expect(restaurantFinded).toEqual(restaurant);
    });
});
