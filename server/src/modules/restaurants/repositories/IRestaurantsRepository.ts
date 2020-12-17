/**
 * Interface Restaurants Repository
 */

import Restaurant from '../typeorm/entities/Restaurant';

import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';

interface IRestaurantsRepository {
    getAll(): Promise<Restaurant[] | undefined>; // Get all restaurants
    findById(id: string): Promise<Restaurant | undefined>; // Find restaurant by id
    findByEmail(email: string): Promise<Restaurant | undefined>; // Find restaurant by e-mail
    create(restaurantData: ICreateRestaurantDTO): Promise<Restaurant>; // Create restaurant
}

export default IRestaurantsRepository;
