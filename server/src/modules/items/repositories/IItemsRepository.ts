/**
 * Items Repository Interface
 */

import { ISaveItemDTO } from '../dtos/ICreateItemDTO';
import Item from '../typeorm/entities/Item';

interface IItemsRepository {
    create(itemData: ISaveItemDTO): Promise<Item>; // Create item
    update(itemData: Item): Promise<Item>; // Update item data
    delete(item_id: string): Promise<void>; // Dele item
}

export default IItemsRepository;
