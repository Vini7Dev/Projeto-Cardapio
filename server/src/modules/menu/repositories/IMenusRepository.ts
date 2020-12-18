/**
 * Interface Menu Repository
 */

import Menu from "../typeorm/entities/Menu";

interface IMenusRepository {
    create(): Promise<Menu>; // Create a new menun for each restaurant
}

export default IMenusRepository;
