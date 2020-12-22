/**
 * Restaurants Repository
 */

import { getRepository, Repository } from 'typeorm';
import ICreateRestaurantDTO from '../../dtos/ICreateRestaurantDTO';

import IRestaurantsRepository from '../../repositories/IRestaurantsRepository';

import Restaurant from '../entities/Restaurant';

class RestaurantsRepository implements IRestaurantsRepository {
    private repository: Repository<Restaurant>;

    // Getting restaurants repository
    constructor() {
        this.repository = getRepository(Restaurant);
    }

    // Getting all restaurants with menu data from database
    public async getAll() {
        const allRestaurants = await this.repository.find({
            relations: ['menu'],
        });

        return allRestaurants;
    }

    // Find one restaurant with id
    public async findById(id: string): Promise<Restaurant | undefined> {
        const restaurantFinded = await this.repository.findOne({
            where: { id },
            relations: ['menu'],
        });

        return restaurantFinded;
    }

    // Find one restaurant with e-mal
    public async findByEmail(email: string): Promise<Restaurant | undefined> {
        const restaurantFinded = await this.repository.findOne({
            where: { email },
            relations: ['menu'],
        });

        return restaurantFinded;
    }

    // Find one restaurant with CNPJ
    public async findByCNPJ(cnpj: string): Promise<Restaurant | undefined> {
        const restaurantFinded = await this.repository.findOne({
            where: { cnpj },
            relations: ['menu'],
        });

        return restaurantFinded;
    }

    // Creating a new restaurant
    public async create(
        restaurantData: ICreateRestaurantDTO,
    ): Promise<Restaurant> {
        const restaurantCreated = await this.repository.create(restaurantData);

        const restaurantSaved = await this.repository.save(restaurantCreated);

        return restaurantSaved;
    }

    // Update restaurant's data
    public async update(restaurantData: Restaurant): Promise<Restaurant> {
        const restaurantUpdated = await this.repository.save(restaurantData);

        return restaurantUpdated;
    }
}

export default RestaurantsRepository;
