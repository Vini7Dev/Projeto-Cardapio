/**
 * Menu Items Repository
 */

import { getRepository, Repository } from 'typeorm';

import MenuItem from '../entities/MenuItem';

import IMenuItemsRepository from '../../repositories/IMenuItemsRepository';
import ICreateMenuItemDTO from '../../dtos/ICreateMenuItemDTO';

class MenuItemsRepository implements IMenuItemsRepository {
    private repository: Repository<MenuItem>;

    constructor() {
        this.repository = getRepository(MenuItem);
    }

    public async create(menuItemData: ICreateMenuItemDTO): Promise<MenuItem> {
        const createdMenuItem = await this.repository.create(menuItemData);

        const savedMenuItem = await this.repository.save(createdMenuItem);

        return savedMenuItem;
    }

    public async delete(item_id: string): Promise<void> {
        const itemToDelete = await this.repository.findOne({
            where: { id: item_id },
        });

        if (!itemToDelete) {
            return;
        }

        await this.repository.remove(itemToDelete);
    }
}

export default MenuItemsRepository;
