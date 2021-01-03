/**
 * Test: Reset Password Service
 */

import AppError from '../../../shared/errors/AppError';

import ForgotPasswordToken from '../typeorm/entities/ForgotPasswordToken';

import ResetPasswordService from './ResetPasswordService';
import CreateRestaurantService from './CreateRestaurantService';

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import FakeRestaurantsRepository from '../repositories/fakes/FakeRestaurantsRepository';

import IMenusRepository from '../../menu/repositories/IMenusRepository';
import FakeMenusRepository from '../../menu/repositories/fakes/FakeMenusRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import IForgotPasswordTokensRepository from '../repositories/IForgotPasswordTokensRepository';
import FakeForgotPasswordTokensRepository from '../repositories/fakes/FakeForgotPasswordTokensRepository';

let resetPasswordService: ResetPasswordService;
let createRestaurantService: CreateRestaurantService;

let restaurantsRepository: IRestaurantsRepository;
let menusRepository: IMenusRepository;
let hashProvider: IHashProvider;
let storageProvider: IStorageProvider;
let forgotPasswordTokensRepository: IForgotPasswordTokensRepository;

describe('ResetPasswordService', () => {
    // Instantiate services for each test
    beforeEach(() => {
        restaurantsRepository = new FakeRestaurantsRepository();
        menusRepository = new FakeMenusRepository();
        hashProvider = new FakeHashProvider();
        storageProvider = new FakeStorageProvider();
        forgotPasswordTokensRepository = new FakeForgotPasswordTokensRepository();

        resetPasswordService = new ResetPasswordService(
            forgotPasswordTokensRepository,
            restaurantsRepository,
            hashProvider,
        );

        createRestaurantService = new CreateRestaurantService(
            restaurantsRepository,
            menusRepository,
            hashProvider,
            storageProvider,
        );
    });

    it('should be able to reset password with new password and a valid token', async () => {
        // Create a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@gmail.com',
            password: 'pass123',
        });

        // Generate forgot password token
        const tokenData = await forgotPasswordTokensRepository.create(
            restaurant.id,
        );

        // Reseting password
        const newRestaurantData = await resetPasswordService.execute({
            token: tokenData.token,
            new_password: 'newPass123',
        });

        // Check if the password has been changed
        expect(newRestaurantData.password).toEqual('newPass123');
    });

    it('should not be able to reset password with a invalid token', async () => {
        // Try to Reset the password with a invalid token
        await expect(
            resetPasswordService.execute({
                token: 'invalid-token',
                new_password: 'newPass123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password with an existing restaurant', async () => {
        // Generate forgot password token with an existing restaurant
        const tokenData = await forgotPasswordTokensRepository.create(
            'invalid-restaurant',
        );

        // Try to reset the password with an existing restaurant
        await expect(
            resetPasswordService.execute({
                token: tokenData.token,
                new_password: 'newPass123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password when token has expired', async () => {
        // Spy create token method
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() - 3);
        });

        // Create a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@gmail.com',
            password: 'pass123',
        });

        // Generate forgot password token
        const tokenData = await forgotPasswordTokensRepository.create(
            restaurant.id,
        );

        // Try to reset password when token has expired
        await expect(
            resetPasswordService.execute({
                token: tokenData.token,
                new_password: 'newPass123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset two or more time the password', async () => {
        // Create a new restaurant
        const restaurant = await createRestaurantService.execute({
            trade: 'Restaurant',
            cnpj: '11111111111',
            telephone: '11111111111',
            logo: 'logo.png',
            email: 'example@gmail.com',
            password: 'pass123',
        });

        // Generate forgot password token
        const tokenData = await forgotPasswordTokensRepository.create(
            restaurant.id,
        );

        // First Reset password
        await resetPasswordService.execute({
            token: tokenData.token,
            new_password: 'newPass123',
        });

        // Try to reset password again
        await expect(
            resetPasswordService.execute({
                token: tokenData.token,
                new_password: 'newPass123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
