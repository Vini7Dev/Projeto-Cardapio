/**
 * Create Restaurant Service
 */

import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

class CreateRestaurantService {
    constructor(private restaurantsRepository: IRestaurantsRepository) {}

    public async execute({
        trade,
        cnpj,
        telephone,
        logo,
        email,
        password
    }: ICreateRestaurantDTO) {
        const restaurantCreated = await this.restaurantsRepository.create({
            trade,
            cnpj,
            telephone,
            logo,
            email,
            password
        });

        return restaurantCreated;
    }
}

export default CreateRestaurantService;
