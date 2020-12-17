/**
 * Create Restaurant Service
 */

import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

class CreateRestaurantService {
    constructor(private restaurantsRepository: IRestaurantsRepository) {}

    // Executing the service
    public async execute({
        trade,
        cnpj,
        telephone,
        logo,
        email,
        password
    }: ICreateRestaurantDTO) {
        // Search a restaurant created with a same email
        const restaurantWithSameEmail = await this.restaurantsRepository.findByEmail(email);

        // If exists, cancel the operation
        if(restaurantWithSameEmail) {
            throw new Error('Já existe um restaurante cadastrado com este e-mail.');
        }

        //Create the restaurant
        const restaurantCreated = await this.restaurantsRepository.create({
            trade,
            cnpj,
            telephone,
            logo,
            email,
            password
        });

        // Return restaurant data
        return restaurantCreated;
    }
}

export default CreateRestaurantService;
