/**
 * Interface Restaurants Repository
 */

import Restaurant from "../typeorm/entities/Restaurant";

import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';

interface IRestaurantsRepository {
    getAll(): Promise<Restaurant[] | undefined>; // Get all restaurants
    create(restaurantData: ICreateRestaurantDTO): Promise<Restaurant>; // Create restaurant
}

export default IRestaurantsRepository;
