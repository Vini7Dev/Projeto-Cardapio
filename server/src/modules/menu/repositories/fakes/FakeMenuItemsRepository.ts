/**
 * Fake: Menu Items Repository
 */

import ICreateMenuItemDTO from '../../dtos/ICreateMenuItemDTO';
import MenuItem from '../../typeorm/entities/MenuItem';
import IMenuItemsRepository from '../IMenuItemsRepository';

class FakeMenuItemsRepository implements IMenuItemsRepository {
    private storage: MenuItem[] = [];

    // Getting all menu items
    public async getItemsByMenuId(
        menu_id: string,
    ): Promise<MenuItem[] | undefined> {
        const allMenuItems = await this.storage.filter(menuItem => {
            return menuItem.menu_id === menu_id;
        });

        return allMenuItems;
    }

    // Create a new menu item
    public async create(menuItemsData: ICreateMenuItemDTO): Promise<MenuItem> {
        const menuItem = new MenuItem();

        const menuItemSaved = {
            ...menuItem,
            ...menuItemsData,
        };

        await this.storage.push(menuItemSaved);

        return menuItemSaved;
    }
}

export default FakeMenuItemsRepository;
