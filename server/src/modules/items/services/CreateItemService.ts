/**
 * Create Item Service
 */

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import MenuItem from '../../menu/typeorm/entities/MenuItem';
import Item from '../typeorm/entities/Item';

import IItemsRepository from '../repositories/IItemsRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import IRestaurantsRepository from '../../restaurants/repositories/IRestaurantsRepository';
import IMenuItemsRepository from '../../menu/repositories/IMenuItemsRepository';

import { ICreateItemDTO } from '../dtos/ICreateItemDTO';

interface IServiceResponse {
    item: Item;
    menu_item: MenuItem;
}

@injectable()
class CreateItemService {
    constructor(
        @inject('ItemsRepository')
        private itemsRepository: IItemsRepository,

        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository,

        @inject('RestaurantsRepository')
        private restaurantsRepository: IRestaurantsRepository,

        @inject('MenuItemsRepository')
        private menuItemsRepository: IMenuItemsRepository,
    ) {}

    // Executing the service
    public async execute({
        restaurant_id,
        title,
        description,
        image,
        price,
        discount_price,
        category_name,
    }: ICreateItemDTO): Promise<IServiceResponse> {
        // Getting restaurant's data
        const restaurantData = await this.restaurantsRepository.findById(
            restaurant_id,
        );

        // Check for a restaurant, if not, cancel the operation
        if (!restaurantData) {
            throw new AppError('O restaurante não existe.');
        }

        // Search for a category already registered in database
        const findSameCategoryInDataBase = await this.categoriesRepository.findByName(
            category_name,
        );

        // Define the category id
        let category_id = 0;

        // If not exists this category in database, register
        if (!findSameCategoryInDataBase) {
            const categoryCreated = await this.categoriesRepository.create(
                category_name,
            );

            // Saving the category id
            category_id = categoryCreated.id;
        } else {
            // Saving the category id
            category_id = findSameCategoryInDataBase.id;
        }

        // Create item
        const itemCreated = await this.itemsRepository.create({
            title,
            description,
            image,
            price,
            discount_price,
            category_id,
            enabled: true,
        });

        // Create a new relation of item and menu in MenuItems table
        const menuItemCreated = await this.menuItemsRepository.create({
            menu_id: restaurantData.menu_id,
            item_id: itemCreated.id,
        });

        // Return item created
        return {
            item: itemCreated,
            menu_item: menuItemCreated,
        };
    }
}

export default CreateItemService;
