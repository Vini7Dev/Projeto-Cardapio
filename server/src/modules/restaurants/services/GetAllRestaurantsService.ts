/**
 * Get All Restaurants Service
 */

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

class GetAllRestaurantsService {
    constructor(private restaurantsRepository: IRestaurantsRepository){}

    // Execute the service
    public async execute() {
        // Getting all restaurants from database
        const allRestaurants = await this.restaurantsRepository.getAll();

        // Return restaurnts finded
        return allRestaurants;
    }
}

export default GetAllRestaurantsService;
