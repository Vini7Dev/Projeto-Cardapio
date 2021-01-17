/**
 * Update Item Service
 */

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import Item from '../typeorm/entities/Item';

import { IUpdateItemDTO } from '../dtos/IUpdateItemDTO';

import IItemsRepository from '../repositories/IItemsRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import IRestaurantsRepository from '../../restaurants/repositories/IRestaurantsRepository';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '../../../shared/errors/AppError';

@injectable()
class UpdateItemService {
    constructor(
        @inject('ItemsRepository')
        private itemsRepository: IItemsRepository,

        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository,

        @inject('RestaurantsRepository')
        private restaurantsRepository: IRestaurantsRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    // Executing the service
    public async execute({
        restaurant_id,
        item_id,
        image,
        title,
        description,
        price,
        discount_price,
        enabled,
    }: IUpdateItemDTO): Promise<Item> {
        // Check if restaurant exists
        const restaurant = await this.restaurantsRepository.findById(
            restaurant_id,
        );

        // If not exists, cancel the operation
        if (!restaurant) {
            throw new AppError('O restaurante não existe.');
        }

        // Check if this item exists
        const itemToUpdate = await this.itemsRepository.findById(item_id);

        // If not exists, cancel the operation
        if (!itemToUpdate) {
            throw new AppError('O item não está cadastrado.');
        }

        // If the authenticated restaurant is not the owner of the item, cancel the operation
        if (restaurant_id !== itemToUpdate.restaurant_id) {
            throw new AppError(
                'O restaurante não tem permissão para alterar este item.',
            );
        }

        // Updating item data
        itemToUpdate.restaurant_id = restaurant_id;
        itemToUpdate.title = title;
        itemToUpdate.description = description;
        itemToUpdate.price = price;
        itemToUpdate.discount_price = discount_price;
        itemToUpdate.enabled = enabled;

        // Updating and saving the new image file in storage
        if (image) {
            // Check if image type file is valid
            const imageNameDotSepared = image.split(/[\s.]+/);
            const imageExtention =
                imageNameDotSepared[imageNameDotSepared.length - 1];

            if (
                imageExtention !== 'png' &&
                imageExtention !== 'jpg' &&
                imageExtention !== 'jpeg'
            ) {
                // Cancel the operation
                throw new AppError('O tipo do arquivo enviado é inválido.');
            }

            // Delete old file from storage
            await this.storageProvider.deleteFile(itemToUpdate.image);

            // Updating logo in storage
            await this.storageProvider.saveFile(image);

            // Updating logo in data base
            itemToUpdate.image = image;
        }

        // Saving updated item data
        const updatedItem = await this.itemsRepository.update(itemToUpdate);

        // Clear cache
        await this.cacheProvider.invalidate(`menus:${restaurant.menu_id}`);

        // Returning item updated
        return updatedItem;
    }
}

export default UpdateItemService;
