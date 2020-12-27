/**
 * Get Menu Items Service
 */

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IMenusRepository from '../repositories/IMenusRepository';
import IMenuItemsRepository from '../repositories/IMenuItemsRepository';

@injectable()
class GetMenuItemsService {
    constructor(
        @inject('MenusRepository')
        private menusRepository: IMenusRepository,

        @inject('MenuItemsRepository')
        private menuItemsRepository: IMenuItemsRepository,
    ) {}

    public async execute(menu_id: string) {
        // Check if menu exists
        const menuFinded = await this.menusRepository.findById(menu_id);

        // If not exists, cancel the operation
        if (!menuFinded) {
            throw new AppError('O cardápio não existe.');
        }

        // Getting item from menu
        const menuItems = await this.menuItemsRepository.getItemsByMenuId(
            menuFinded.id,
        );

        // Returning response
        return menuItems;
    }
}

export default GetMenuItemsService;
