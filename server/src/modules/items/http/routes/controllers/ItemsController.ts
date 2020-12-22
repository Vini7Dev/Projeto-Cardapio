/**
 * Foods Controller
 */

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateItemService from '../../../services/CreateItemService';

// Controler
class FoodsController {
    // Create one food
    public async create(request: Request, response: Response) {
        const createItemService = container.resolve(CreateItemService);

        const itemData = request.body;

        const restaurant_id = request.restaurant.id;

        const itemAndMenuitem = await createItemService.execute({
            ...itemData,
            restaurant_id,
        });

        return response.json(itemAndMenuitem).status(200);
    }

    // Update item data
    public async update(request: Request, response: Response) {
        console.log('Em desenvolvimento...');
        return response.json({ message: 'Atualizar um Alimento' }).status(200);
    }

    // Delete a item
    public async delete(request: Request, response: Response) {
        console.log('Em desenvolvimento...');
        return response.json({ message: 'Deletar um Alimento' }).status(200);
    }
}

export default FoodsController;
