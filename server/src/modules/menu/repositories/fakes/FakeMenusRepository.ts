/**
 * Fake: Menus Repository
 */

import { uuid } from 'uuidv4';
import Menu from '../../typeorm/entities/Menu';
import IMenusRepository from '../IMenusRepository';

class FakeMenusRepository implements IMenusRepository {
    private nextMenuCode = 1;

    private menusStorage: Menu[] = [];

    // Find by menu id
    public async findById(menu_id: string): Promise<Menu | undefined> {
        const menuFinded = this.menusStorage.find(menu => menu.id === menu_id);

        return menuFinded;
    }

    // Find by menu code
    public async findByMenuCode(menu_code: number): Promise<Menu | undefined> {
        const menuFinded = this.menusStorage.find(
            menu => menu.code === menu_code,
        );

        return menuFinded;
    }

    // Create a new menu
    public async create(): Promise<Menu> {
        const menu = new Menu();

        menu.id = this.nextMenuCode.toString();
        menu.code = this.nextMenuCode;

        this.menusStorage.push(menu);

        this.nextMenuCode += 1;

        return menu;
    }
}

export default FakeMenusRepository;
