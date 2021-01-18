/**
 * Menu Controller
 */

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetMenuItemsService from '../../../services/GetMenuItemsService';

// Controller
class MenuItemsController {
    // Look for a menu with items
    public async index(request: Request, response: Response) {
        // Instanctiate Create Item Service
        const getMenuItemsService = container.resolve(GetMenuItemsService);

        // Getting menu code from request params
        const { menu_code } = request.params;

        // Gerring items from menu
        const menuItems = await getMenuItemsService.execute(Number(menu_code));

        // Add image_url attribute for each item data
        let parsedItemsData;
        if (menuItems.menuItems) {
            parsedItemsData = menuItems.menuItems.map(item => {
                const parsedItem = classToClass(item.item);

                return {
                    ...item,
                    item: parsedItem,
                };
            });
        }

        // Returning response
        return response
            .json({
                restaurantOwner: classToClass(menuItems.restaurantOwner),
                menu: parsedItemsData,
            })
            .status(200);
    }
}

export default MenuItemsController;
