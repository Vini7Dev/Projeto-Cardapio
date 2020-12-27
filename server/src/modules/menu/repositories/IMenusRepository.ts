/**
 * Interface Menu Repository
 */

import Menu from '../typeorm/entities/Menu';
import MenuItem from '../typeorm/entities/MenuItem';

interface IMenusRepository {
    findById(menu_id: string): Promise<Menu | undefined>; // Find by menu id
    findByMenuCode(menu_code: number): Promise<Menu | undefined>; // Find by menu code
    create(): Promise<Menu>; // Create a new menu
}

export default IMenusRepository;
