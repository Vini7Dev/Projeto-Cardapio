/**
 * Interface Restaurants Repository
 */

import Restaurant from '../typeorm/entities/Restaurant';

import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';

interface IRestaurantsRepository {
    getAll(): Promise<Restaurant[] | undefined>; // Get all restaurants
    findById(id: string): Promise<Restaurant | undefined>; // Find restaurant by id
    findByEmail(email: string): Promise<Restaurant | undefined>; // Find restaurant by e-mail
    findByCNPJ(cnpj: string): Promise<Restaurant | undefined>; // Find restaurant by CNPJ
    findByMenuId(menu_id: string): Promise<Restaurant | undefined>; // Find restaurant by menu id
    create(restaurantData: ICreateRestaurantDTO): Promise<Restaurant>; // Create restaurant
    update(restaurantData: Restaurant): Promise<Restaurant>; // Update restaurant
}

export default IRestaurantsRepository;
