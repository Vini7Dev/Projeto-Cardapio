/**
 * Menu routes
 */

import { Router } from 'express';

import MenuController from './controllers/MenuItemsController';

// Create a route object
const menuItems = Router();
const menuController = new MenuController();

// Menu routes
// Look for a menu with items
menuItems.get('/:menu_code', menuController.index);

export default menuItems;
