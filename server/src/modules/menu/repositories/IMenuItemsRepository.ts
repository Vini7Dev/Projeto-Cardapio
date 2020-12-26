/**
 * Menu Items Repository Interface
 */

import MenuItem from '../typeorm/entities/MenuItem';

import ICreateMenuItemDTO from '../dtos/ICreateMenuItemDTO';

interface IMenuItemsRepository {
    create(menuItemData: ICreateMenuItemDTO): Promise<MenuItem>; // Create a new menu item
    delete(item_id: string): Promise<void>; // Delete menu item
}

export default IMenuItemsRepository;
