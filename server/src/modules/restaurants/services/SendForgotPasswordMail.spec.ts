/**
 * Test: Send Forgot Password Mail
 */

import AppError from '../../../shared/errors/AppError';

import SendForgotPasswordMail from './SendForgotPasswordMail';
import CreateRestaurantService from './CreateRestaurantService';

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import FakeRestaurantsRepository from '../repositories/fakes/FakeRestaurantsRepository';

import IMenusRepository from '../../menu/repositories/IMenusRepository';
import FakeMenusRepository from '../../menu/repositories/fakes/FakeMenusRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';
import FakeMailProvider from '../../../shared/container/providers/MailProvider/fakes/IFakeMailProvider';

import IForgotPasswordTokensRepositoryaa from '../repositories/IForgotPasswordTokensRepository';
import FakeForgotPasswordTokensRepository from '../repositories/fakes/FakeForgotPasswordTokensRepository';

let sendForgotPasswordMail: SendForgotPasswordMail;
let createRestaurantService: CreateRestaurantService;

let restaurantsRepository: IRestaurantsRepository;
let menusRepository: IMenusRepository;
let hashProvider: IHashProvider;
let storageProvider: IStorageProvider;
let mailProvider: IMailProvider;
let forgotPasswordTokensRepository: IForgotPasswordTokensRepositoryaa;

describe('SendForgotPasswordMail', () => {
    // Instantiate services for each test
    beforeEach(() => {
        restaurantsRepository = new FakeRestaurantsRepository();
        menusRepository = new FakeMenusRepository();
        hashProvider = new FakeHashProvider();
        storageProvider = new FakeStorageProvider();
        mailProvider = new FakeMailProvider();
        forgotPasswordTokensRepository = new FakeForgotPasswordTokensRepository();

        sendForgotPasswordMail = new SendForgotPasswordMail(
            restaurantsRepository,
            forgotPasswordTokensRepository,
            mailProvider,
        );
        createRestaurantService = new CreateRestaurantService(
            restaurantsRepository,
            menusRepository,
            hashProvider,
            storageProvider,
        );
    });

    it('it should be able to recover password using email', async () => {
        // Spy send mail method
        const sendMail = jest.spyOn(mailProvider, 'sendMail');

        // Creating a restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@gmail.com',
            password: 'pass123',
        });

        // Sending mail
        await sendForgotPasswordMail.execute(restaurant.email);

        // Check if the method 'sendMail' has been called
        expect(sendMail).toHaveBeenCalled();
    });

    it('it should not be able to recover password using an non existing email', async () => {
        // Try to recover a password with invalid email
        await expect(
            sendForgotPasswordMail.execute('non-existing-email'),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        // Spy generate token method
        const createToken = jest.spyOn(
            forgotPasswordTokensRepository,
            'create',
        );

        // Creating a restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@gmail.com',
            password: 'pass123',
        });

        // Sending mail
        await sendForgotPasswordMail.execute(restaurant.email);

        // Check if 'create' method has been called
        expect(createToken).toHaveBeenCalledWith(restaurant.id);
    });
});
