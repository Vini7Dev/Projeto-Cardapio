/**
 * Get Menu Items Service
 */

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '../../../shared/errors/AppError';

import IMenusRepository from '../repositories/IMenusRepository';
import IMenuItemsRepository from '../repositories/IMenuItemsRepository';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';

import MenuItem from '../typeorm/entities/MenuItem';

@injectable()
class GetMenuItemsService {
    constructor(
        @inject('MenusRepository')
        private menusRepository: IMenusRepository,

        @inject('MenuItemsRepository')
        private menuItemsRepository: IMenuItemsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(menu_code: number) {
        // Check if menu exists
        const menuFinded = await this.menusRepository.findByMenuCode(menu_code);

        // If not exists, cancel the operation
        if (!menuFinded) {
            throw new AppError('O cardápio não existe.');
        }

        // Try to get data from cache
        const cacheKey = `menus:${menuFinded.id}`;
        let menuItems = await this.cacheProvider.recover<MenuItem[]>(cacheKey);

        // If not exists in cache, get from data base
        if (!menuItems) {
            // Getting item from menu
            menuItems = await this.menuItemsRepository.getItemsByMenuId(
                menuFinded.id,
            );

            // Saving data in cache
            await this.cacheProvider.save(cacheKey, classToClass(menuItems));
        }

        // Returning response
        return menuItems;
    }
}

export default GetMenuItemsService;
