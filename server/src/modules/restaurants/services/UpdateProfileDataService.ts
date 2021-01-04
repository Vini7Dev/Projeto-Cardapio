/**
 * Update Profile Data Service
 */

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IUpdateRestaurantData from '../dtos/IUpdateRestaurantData';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';

@injectable()
class UpdateProfileDataService {
    constructor(
        @inject('RestaurantsRepository')
        private restaurantsRepository: IRestaurantsRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    // Execute the service
    public async execute({
        restaurant_id,
        trade,
        telephone,
        logo,
        new_password,
        current_password,
    }: IUpdateRestaurantData) {
        // Getting restaurant's original data
        const restaurant = await this.restaurantsRepository.findById(
            restaurant_id,
        );

        // Verify if this restaurant_id is valid
        if (!restaurant) {
            throw new AppError('O restaurante não foi encontrado.', 404);
        }

        // Verify that the password entered is valid
        const passwordIsValid = await this.hashProvider.compareHash(
            current_password,
            restaurant.password,
        );

        // If not valid, cancel the operation
        if (!passwordIsValid) {
            throw new AppError('A senha informada é inválida.', 401);
        }

        // Updating trade and telephone
        restaurant.trade = trade;
        restaurant.telephone = telephone;

        // Updating password
        if (new_password) {
            restaurant.password = await this.hashProvider.generateHash(
                new_password,
            );
        }

        // Saving updated logo file in storage
        if (logo !== restaurant.logo && logo !== '') {
            // Check if logo type file is valid
            const logoNameDotSepared = logo.split(/[\s.]+/);
            const logoExtention = logoNameDotSepared[logoNameDotSepared.length -1];

            if(logoExtention !== 'png' && logoExtention !== 'jpg' && logoExtention !== 'jpeg') {
                // Cancel the operation
                throw new AppError('O tipo do arquivo enviado é inválido.');
            }

            // Delete old logo file from storage
            await this.storageProvider.deleteFile(restaurant.logo);

            // Updating logo in storage
            await this.storageProvider.saveFile(logo);

            // Updating logo in data base
            restaurant.logo = logo;
        }

        // Saving updated restaurant
        const restaurantUpdated = await this.restaurantsRepository.update(
            restaurant,
        );

        // Returning updated restaurant
        return restaurantUpdated;
    }
}

export default UpdateProfileDataService;
