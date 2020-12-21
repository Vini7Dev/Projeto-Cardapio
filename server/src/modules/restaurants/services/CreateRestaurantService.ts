/**
 * Create Restaurant Service
 */

import { injectable, inject, container } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import Restaurant from '../typeorm/entities/Restaurant';

import CreateMenuService from '../../menu/services/CreateMenuService';

import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';

@injectable()
class CreateRestaurantService {
    constructor(
        @inject('RestaurantsRepository')
        private restaurantsRepository: IRestaurantsRepository,

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
    }: ICreateRestaurantDTO): Promise<Restaurant> {
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

        // Instantiate "Create Menu Service"
        const createMenuService = container.resolve(CreateMenuService);

        // Creating a menu for restaurant
        const menu = await createMenuService.execute();

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

        // Saving file in storage
        if (logo) {
            await this.storageProvider.saveFile(logo);
        }

        // Return restaurant data
        return restaurantCreated;
    }
}

export default CreateRestaurantService;
