/**
 * Fake: Items Repository
 */

import Item from '../../typeorm/entities/Item';

import { ISaveItemDTO } from '../../dtos/ICreateItemDTO';
import IItemsRepository from '../IItemsRepository';

import AppError from '../../../../shared/errors/AppError';

class FakeItemsRepository implements IItemsRepository {
    private storage: Item[];

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

        await this.storage[itemIndex] = itemData;

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
