/**
 * Create Restaurant Service
 */

import { injectable, inject } from 'tsyringe';

import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import Restaurant from '../typeorm/entities/Restaurant';

@injectable()
class CreateRestaurantService {
    constructor(
        @inject('RestaurantsRepository')
        private restaurantsRepository: IRestaurantsRepository
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
            throw new Error(
                'Já existe um restaurante cadastrado com este e-mail.',
            );
        }

        // Search a restaurant created with a same CNPJ
        const restaurantWithSameCNPJ = await this.restaurantsRepository.findByCNPJ(
            cnpj,
        );

        // If exists, cancel the operation
        if (restaurantWithSameCNPJ) {
            throw new Error(
                'Já existe um restaurante cadastrado com este CNPJ.',
            );
        }

        // Create the restaurant
        const restaurantCreated = await this.restaurantsRepository.create({
            trade,
            cnpj,
            telephone,
            logo,
            email,
            password,
        });

        // Return restaurant data
        return restaurantCreated;
    }
}

export default CreateRestaurantService;
