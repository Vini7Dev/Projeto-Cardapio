/**
 * Fake: Menus Repository
 */

import Menu from '../../typeorm/entities/Menu';
import IMenusRepository from '../IMenusRepository';

class FakeMenusRepository implements IMenusRepository {
    private nextMenuCode = 1;

    private menusStorage: Menu[] = [];

    // Create a new menun
    public async create(): Promise<Menu> {
        const menu = new Menu();

        menu.code = this.nextMenuCode;

        this.menusStorage.push(menu);

        this.nextMenuCode += 1;

        return menu;
    }
}

export default FakeMenusRepository;
