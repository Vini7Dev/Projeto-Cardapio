/**
 * Fake: Restaurants Repository
 */

import { uuid } from 'uuidv4';

import AppError from '../../../../shared/errors/AppError';
import Restaurant from '../../typeorm/entities/Restaurant';

import IRestaurantsRepository from '../IRestaurantsRepository';
import ICreateRestaurantDTO from '../../dtos/ICreateRestaurantDTO';

class FakeRestaurantsRepository implements IRestaurantsRepository {
    private repository: Restaurant[] = [];

    // Get all restaurants
    public async getAll(): Promise<Restaurant[] | undefined> {
        return this.repository;
    }

    // Find restaurant by id
    public async findById(id: string): Promise<Restaurant | undefined> {
        const restaurantFinded = this.repository.find(
            restaurant => restaurant.id === id,
        );

        return restaurantFinded;
    }

    // Find restaurant by email
    public async findByEmail(email: string): Promise<Restaurant | undefined> {
        const restaurantFinded = this.repository.find(
            restaurant => restaurant.email === email,
        );

        return restaurantFinded;
    }

    // Find restaurant by cnpj
    public async findByCNPJ(cnpj: string): Promise<Restaurant | undefined> {
        const restaurantFinded = this.repository.find(
            restaurant => restaurant.cnpj === cnpj,
        );

        return restaurantFinded;
    }

    // Find restaurant by menu id
    public async findByMenuId(
        menu_id: string,
    ): Promise<Restaurant | undefined> {
        const restaurantFinded = this.repository.find(
            restaurant => restaurant.menu_id === menu_id,
        );

        return restaurantFinded;
    }

    // Create restaurant
    public async create(
        restaurantData: ICreateRestaurantDTO,
    ): Promise<Restaurant> {
        const restaurant = new Restaurant();

        const restaurantCreated = {
            ...restaurant,
            ...restaurantData,
            id: uuid(),
        } as Restaurant;

        this.repository.push(restaurantCreated);

        return restaurantCreated;
    }

    // Update restaurant data
    public async update(restaurantData: Restaurant): Promise<Restaurant> {
        const restaurantIndex = this.repository.findIndex(
            restaurant => restaurant.id === restaurantData.id,
        );

        if (restaurantIndex < 0) {
            throw new AppError('O usuário não foi encontrado.', 404);
        }

        this.repository[restaurantIndex] = restaurantData;

        return restaurantData;
    }
}

export default FakeRestaurantsRepository;
