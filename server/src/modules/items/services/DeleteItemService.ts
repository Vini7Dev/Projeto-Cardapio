/**
 * Delete Item Service
 */

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IItemsRepository from '../repositories/IItemsRepository';
import IRestaurantsRepository from '../../restaurants/repositories/IRestaurantsRepository';

interface IServiceRequest {
    restaurant_id: string;
    item_id: string;
}

@injectable()
class DeleteItemService {
    constructor(
        @inject('ItemsRepository')
        private itemsRepository: IItemsRepository,

        @inject('RestaurantsRepository')
        private restaurantsRepository: IRestaurantsRepository,
    ) {}

    // Executing the service
    public async execute({ restaurant_id, item_id }: IServiceRequest) {
        // Check if restaurants exists
        const restaurant = await this.restaurantsRepository.findById(
            restaurant_id,
        );

        // If not exists, cancel the operation
        if (!restaurant) {
            throw new AppError('O restaurante não existe.');
        }

        // Check if item exists
        const item = await this.itemsRepository.findById(item_id);

        // If not exists, cancel the operation
        if (!item) {
            throw new AppError('O item não existe.');
        }

        // If the authenticated restaurant is not the owner of the item, cancel the operation
        if (restaurant_id !== item.restaurant_id) {
            throw new AppError(
                'O restaurante não tem permissão para apagar este item.',
            );
        }

        // Deleting item
        await this.itemsRepository.delete(item_id);
    }
}

export default DeleteItemService;
