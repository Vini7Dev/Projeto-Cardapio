/**
 * Menus Repository
 */

import { getRepository, Repository } from 'typeorm';

import IMenusRepository from 'modules/menu/repositories/IMenusRepository';
import Menu from '../entities/Menu';

class MenusRepository implements IMenusRepository {
    private repository: Repository<Menu>;

    constructor() {
        this.repository = getRepository(Menu);
    }

    // Creating a new menu
    public async create(): Promise<Menu> {
        const menuCreated = await this.repository.create();

        const menuSaved = await this.repository.save(menuCreated);

        return menuSaved;
    }
}

export default MenusRepository;
