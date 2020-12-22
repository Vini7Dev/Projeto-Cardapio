/**
 * Interface Menu Repository
 */

import Menu from '../typeorm/entities/Menu';

interface IMenusRepository {
    create(): Promise<Menu>; // Create a new menun
}

export default IMenusRepository;
