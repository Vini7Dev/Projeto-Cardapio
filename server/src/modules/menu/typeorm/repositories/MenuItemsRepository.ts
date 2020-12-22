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
}

export default MenuItemsRepository;
