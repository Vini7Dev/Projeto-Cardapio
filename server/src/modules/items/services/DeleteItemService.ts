/**
 * Delete Item Service
 */

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IItemsRepository from '../repositories/IItemsRepository';
import IRestaurantsRepository from '../../restaurants/repositories/IRestaurantsRepository';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';

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

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
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

        // Deleting image from storage
        if (item.image) {
            await this.storageProvider.deleteFile(item.image);
        }

        // Clear cache
        await this.cacheProvider.invalidate(`menus:${restaurant.menu_id}`);

        // Deleting item
        await this.itemsRepository.delete(item_id);
    }
}

export default DeleteItemService;
