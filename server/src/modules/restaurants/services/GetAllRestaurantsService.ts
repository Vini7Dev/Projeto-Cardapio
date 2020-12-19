/**
 * Get All Restaurants Service
 */

import { injectable, inject } from 'tsyringe';

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import Restaurant from '../typeorm/entities/Restaurant';

@injectable()
class GetAllRestaurantsService {
    constructor(
        @inject('RestaurantsRepository')
        private restaurantsRepository: IRestaurantsRepository,
    ) {}

    // Execute the service
    public async execute(): Promise<Restaurant[] | undefined> {
        // Getting all restaurants from database
        const allRestaurants = await this.restaurantsRepository.getAll();

        // Return restaurnts finded
        return allRestaurants;
    }
}

export default GetAllRestaurantsService;
