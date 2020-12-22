/**
 * Items Repository
 */

import { getRepository, Repository } from 'typeorm';

import Item from '../entities/Item';

import IItemsRepository from '../../repositories/IItemsRepository';
import { ISaveItemDTO } from '../../dtos/ICreateItemDTO';

class ItemsRepository implements IItemsRepository {
    private repository: Repository<Item>;

    constructor() {
        this.repository = getRepository(Item);
    }

    // Creating a new item
    public async create(itemData: ISaveItemDTO): Promise<Item> {
        const createdItem = await this.repository.create(itemData);

        const savedItem = await this.repository.save(createdItem);

        return savedItem;
    }

    // Update item data
    public async update(itemData: Item): Promise<Item> {
        const itemUpdated = await this.repository.save(itemData);

        return itemUpdated;
    }

    // Deleting item
    public async delete(item_id: string): Promise<void> {
        const findedItem = await this.repository.findOne({
            where: { id: item_id },
        });

        if (!findedItem) {
            return;
        }

        await this.repository.delete(findedItem);
    }
}

export default ItemsRepository;
