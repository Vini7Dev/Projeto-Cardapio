/**
 * Foods Controller
 */

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetItemDataService from '../../../services/GetItemDataService';
import CreateItemService from '../../../services/CreateItemService';
import UpdateItemService from '../../../services/UpdateItemService';
import DeleteItemService from '../../../services/DeleteItemService';

// Controler
class FoodsController {
    // Get food data
    public async index(request: Request, response: Response) {
        // Instanctiate Create Item Service
        const getItemDataService = container.resolve(GetItemDataService);

        // Get item id from request;
        const { item_id } = request.params;

        // Item data
        const itemData = await getItemDataService.execute(item_id);

        // Returning response
        return response.json(classToClass(itemData)).status(200);
    }

    // Create one food
    public async create(request: Request, response: Response) {
        // Instanctiate Create Item Service
        const createItemService = container.resolve(CreateItemService);

        // Getting item data from request body
        const {
            title,
            description,
            price,
            discount_price,
            enabled,
            category_name,
        } = request.body;

        // Getting restaurants id from auth request
        const restaurant_id = request.restaurant.id;

        // Recover logo data from multer's request
        let image = '';
        if (request.file) {
            image = request.file.filename;
        }

        // Creating a new item
        const itemAndMenuItem = await createItemService.execute({
            restaurant_id,
            image,
            title,
            description,
            price,
            discount_price,
            enabled,
            category_name,
        });

        // Add image_url attibute in item data
        const parsedItemAndMenuItem = {
            item: classToClass(itemAndMenuItem.item),
            menu_iem: itemAndMenuItem.menu_item,
        };

        // Returning response
        return response.json(parsedItemAndMenuItem).status(200);
    }

    // Update item data
    public async update(request: Request, response: Response) {
        // Instanctiate Create Item Service
        const updateItemService = container.resolve(UpdateItemService);

        // Getting item data from request body
        const {
            item_id,
            title,
            description,
            price,
            discount_price,
            enabled,
        } = request.body;

        // Recover logo data from multer's request
        let image = '';
        if (request.file) {
            image = request.file.filename;
        }

        // Getting restaurants id from auth request
        const restaurant_id = request.restaurant.id;

        // Creating a new item
        const updatedItem = await updateItemService.execute({
            restaurant_id,
            item_id,
            image,
            title,
            description,
            price,
            discount_price,
            enabled,
        });

        // Add image_attribule in item data
        const parsedUpdatedItem = classToClass(updatedItem);

        // Returning response
        return response.json(parsedUpdatedItem).status(200);
    }

    // Delete a item
    public async delete(request: Request, response: Response) {
        // Instanctiate Create Item Service
        const deleteItemService = container.resolve(DeleteItemService);

        // Getting item id from request params
        const { item_id } = request.params;

        // Getting restaurants id from auth request
        const restaurant_id = request.restaurant.id;

        // Deleting item
        await deleteItemService.execute({
            restaurant_id,
            item_id,
        });

        // Returning response
        return response.json().status(200);
    }
}

export default FoodsController;
