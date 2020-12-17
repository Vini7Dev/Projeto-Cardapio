/**
 * Menu routes
 */

import { Router } from 'express';
import MenuController from './controllers/MenuItemsController';

// Create a route object
const menuItems = Router();
const menuController = new MenuController();

// Menu routes
// Look for a menu
menuItems.get('/', menuController.index);

// Create a restaurant
menuItems.post('/', menuController.create);

// Update the restaurant data
menuItems.put('/', menuController.update);

export default menuItems;
