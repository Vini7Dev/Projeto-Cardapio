/**
 * Get Item Data Service
 */

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IItemsRepository from '../repositories/IItemsRepository';

@injectable()
class GetItemDataService {
    constructor(
        @inject('ItemsRepository')
        private itemsRepository: IItemsRepository,
    ) {}

    public async execute(item_id: string) {
        const itemFinded = await this.itemsRepository.findById(item_id);

        return itemFinded;
    }
}

export default GetItemDataService;
