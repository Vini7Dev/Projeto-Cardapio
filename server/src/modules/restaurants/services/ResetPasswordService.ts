/**
 * Reset Password Service
 */

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IForgotPasswordTokensRepository from '../repositories/IForgotPasswordTokensRepository';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IServiceRequest {
    token: string;
    new_password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('ForgotPasswordTokensRepository')
        private forgotPasswordTokensRepository: IForgotPasswordTokensRepository,

        @inject('RestaurantsRepository')
        private restaurantsRepository: IRestaurantsRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, new_password }: IServiceRequest) {
        // Getting forgot password token data
        const tokenData = await this.forgotPasswordTokensRepository.findByToken(
            token,
        );

        // If token does not exists, cancel the operation
        if (!tokenData) {
            throw new AppError('O token informado é inválido.');
        }

        // Find the restaurant responsible for the token
        const restaurant = await this.restaurantsRepository.findById(
            tokenData.restaurant_id,
        );

        // If restaurant does not exists, cancel the operation
        if (!restaurant) {
            throw new AppError('O restaurante informado não existe.');
        }

        // Check if token has expired
        if (Date.now() - tokenData.created_at.getTime() > 7200000) {
            throw new AppError('O token expirou.');
        }

        // Encrypting password
        restaurant.password = await this.hashProvider.generateHash(
            new_password,
        );

        // Updating restaurant's password
        const restaurantUpdated = await this.restaurantsRepository.update(
            restaurant,
        );

        // Delete token from database
        await this.forgotPasswordTokensRepository.delete(tokenData.id);

        // Returning restaurant updated
        return restaurantUpdated;
    }
}

export default ResetPasswordService;
