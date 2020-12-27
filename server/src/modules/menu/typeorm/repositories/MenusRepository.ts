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

    // Find by menu id
    public async findById(menu_id: string): Promise<Menu | undefined> {
        const menuFinded = await this.repository.findOne({
            where: { id: menu_id },
        });

        return menuFinded;
    }

    // Find by menu code
    public async findByMenuCode(menu_code: number): Promise<Menu | undefined> {
        const menuFinded = await this.repository.findOne({
            where: { code: menu_code },
        });

        return menuFinded;
    }

    // Creating a new menu
    public async create(): Promise<Menu> {
        const menuCreated = await this.repository.create();

        const menuSaved = await this.repository.save(menuCreated);

        return menuSaved;
    }
}

export default MenusRepository;
