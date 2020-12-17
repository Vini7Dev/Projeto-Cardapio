/**
 * Get All Restaurants Service
 */

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

class GetAllRestaurantsService {
    constructor(private restaurantsRepository: IRestaurantsRepository){}

    public async execute() {
        const allRestaurants = await this.restaurantsRepository.getAll();

        return allRestaurants;
    }
}

export default GetAllRestaurantsService;
