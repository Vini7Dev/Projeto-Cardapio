/**
 * Create Restaurant Service
 */

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import Restaurant from '../typeorm/entities/Restaurant';

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IMenusRepository from '../../menus/repositories/IMenusRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';

import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';

@injectable()
class CreateRestaurantService {
    constructor(
        @inject('RestaurantsRepository')
        private restaurantsRepository: IRestaurantsRepository,

        @inject('MenusRepository')
        private menusRepository: IMenusRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    // Executing the service
    public async execute({
        trade,
        cnpj,
        telephone,
        logo,
        email,
        password,
    }: Omit<ICreateRestaurantDTO, 'menu_id'>): Promise<Restaurant> {
        // Search a restaurant created with a same email
        const restaurantWithSameEmail = await this.restaurantsRepository.findByEmail(
            email,
        );

        // If exists, cancel the operation
        if (restaurantWithSameEmail) {
            throw new AppError(
                'Já existe um restaurante cadastrado com este e-mail.',
            );
        }

        // Search a restaurant created with a same CNPJ
        const restaurantWithSameCNPJ = await this.restaurantsRepository.findByCNPJ(
            cnpj,
        );

        // If exists, cancel the operation
        if (restaurantWithSameCNPJ) {
            throw new AppError(
                'Já existe um restaurante cadastrado com este CNPJ.',
            );
        }

        // Encrypting the password
        const hashedPassword = await this.hashProvider.generateHash(password);

        // Creating a menu for restaurant
        const menu = await this.menusRepository.create();

        // Create the restaurant
        const restaurantCreated = await this.restaurantsRepository.create({
            trade,
            cnpj,
            telephone,
            logo,
            menu_id: menu.id,
            email,
            password: hashedPassword,
        });

        // Saving logo file in storage
        if (logo) {
            // Check if logo type file is valid
            const logoNameDotSepared = logo.toLowerCase().split(/[\s.]+/);
            const logoExtention =
                logoNameDotSepared[logoNameDotSepared.length - 1];

            if (
                logoExtention !== 'png' &&
                logoExtention !== 'jpg' &&
                logoExtention !== 'jpeg'
            ) {
                // Cancel the operation
                throw new AppError('O tipo do arquivo enviado é inválido.');
            }

            // Saving image logo in storage
            await this.storageProvider.saveFile(logo);
        }

        // Return restaurant data
        return restaurantCreated;
    }
}

export default CreateRestaurantService;
