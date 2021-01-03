/**
 * Menu Items Repository Interface
 */

import MenuItem from '../typeorm/entities/MenuItem';

import ICreateMenuItemDTO from '../dtos/ICreateMenuItemDTO';

interface IMenuItemsRepository {
    getItemsByMenuId(menu_id: string): Promise<MenuItem[] | undefined>; // Getting all menu items
    create(menuItemData: ICreateMenuItemDTO): Promise<MenuItem>; // Create a new menu item
}

export default IMenuItemsRepository;
