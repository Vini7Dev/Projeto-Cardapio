/**
 * Get Profile Data Service
 */

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import Restaurant from '../typeorm/entities/Restaurant';

@injectable()
class GetProfileDataService {
    constructor(
        @inject('RestaurantsRepository')
        private restaurantsRepository: IRestaurantsRepository,
    ) {}

    // Execute the service
    public async execute(
        restaurant_id: string,
    ): Promise<Restaurant | undefined> {
        // Getting restaurant by id
        const findedRestaurant = await this.restaurantsRepository.findById(
            restaurant_id,
        );

        // Returning result
        return findedRestaurant;
    }
}

export default GetProfileDataService;
