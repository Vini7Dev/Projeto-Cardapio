/**
 * Foods Controller
 */

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateItemService from '../../../services/CreateItemService';
import UpdateItemService from '../../../services/UpdateItemService';

// Controler
class FoodsController {
    // Create one food
    public async create(request: Request, response: Response) {
        // Instanctiate Create Item Service
        const createItemService = container.resolve(CreateItemService);

        // Getting item data from request body
        const {
            image,
            title,
            description,
            price,
            discount_price,
            category_name,
        } = request.body;

        // Getting restaurant_id from request
        const restaurant_id = request.restaurant.id;

        // Creating a new item
        const itemAndMenuitem = await createItemService.execute({
            restaurant_id,
            image,
            title,
            description,
            price,
            discount_price,
            category_name,
        });

        // Returning response
        return response.json(itemAndMenuitem).status(200);
    }

    // Update item data
    public async update(request: Request, response: Response) {
        // Instanctiate Create Item Service
        const updateItemService = container.resolve(UpdateItemService);

        // Getting item data from request body
        const {
            item_id,
            image,
            title,
            description,
            price,
            discount_price,
            category_name,
            enabled,
        } = request.body;

        // Creating a new item
        const updatedItem = await updateItemService.execute({
            item_id,
            image,
            title,
            description,
            price,
            discount_price,
            category_name,
            enabled,
        });

        // Returning response
        return response.json(updatedItem).status(200);
    }

    // Delete a item
    public async delete(request: Request, response: Response) {
        console.log('Em desenvolvimento...');
        return response.json({ message: 'Deletar um Alimento' }).status(200);
    }
}

export default FoodsController;
