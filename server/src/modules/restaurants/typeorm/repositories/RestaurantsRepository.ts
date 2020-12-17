/**
 * Restaurants Repository
 */

import { getRepository, Repository } from 'typeorm';
import ICreateRestaurantDTO from '../../dtos/ICreateRestaurantDTO';

import IRestaurantsRepository from '../../repositories/IRestaurantsRepository';

import Restaurant from '../entities/Restaurant';

class RestaurantsRepository implements IRestaurantsRepository {
    private repository: Repository<Restaurant>;

    constructor() {
        this.repository = getRepository(Restaurant);
    }

    public async getAll() {
        const allRepositories = await this.repository.find();

        return allRepositories;
    }

    public async create(restaurantData: ICreateRestaurantDTO): Promise<Restaurant> {
        const restaurantCreated = await this.repository.create(restaurantData);

        const restaurantSaved = await this.repository.save(restaurantCreated);

        return restaurantSaved;
    }
}

export default RestaurantsRepository;
