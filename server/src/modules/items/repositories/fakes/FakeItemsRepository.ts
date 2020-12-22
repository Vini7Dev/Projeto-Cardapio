/**
 * Fake: Items Repository
 */

import Item from '../../typeorm/entities/Item';

import { ISaveItemDTO } from '../../dtos/ICreateItemDTO';
import IItemsRepository from '../IItemsRepository';

import AppError from '../../../../shared/errors/AppError';

class FakeItemsRepository implements IItemsRepository {
    private storage: Item[] = [];

    // Find item by id
    public async findById(item_id: string): Promise<Item | undefined> {
        const findedItem = await this.storage.find(item => item.id === item_id);

        return findedItem;
    }

    // Create item
    public async create(itemData: ISaveItemDTO): Promise<Item> {
        const item = new Item();

        const itemToSave = {
            ...item,
            ...itemData,
        };

        await this.storage.push(itemToSave);

        return itemToSave;
    }

    // Update item data
    public async update(itemData: Item): Promise<Item> {
        const itemIndex = await this.storage.findIndex(
            item => item.id === itemData.id,
        );

        if (itemIndex < 0) {
            throw new AppError('O item não foi encontrado.', 404);
        }

        this.storage[itemIndex] = itemData;

        return itemData;
    }

    // Delete item
    public async delete(item_id: string): Promise<void> {
        const itemIndex = await this.storage.findIndex(
            item => item.id === item_id,
        );

        await this.storage.splice(itemIndex, 1);
    }
}

export default FakeItemsRepository;
