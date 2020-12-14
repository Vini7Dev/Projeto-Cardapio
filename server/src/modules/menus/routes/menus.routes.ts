/**
 * Menu routes
 */

import { Router } from 'express';
import MenuController from './controllers/MenuController';

// Create a route object
const menusRoutes = Router();
const menuController = new MenuController();

// Menu routes
// Look for a menu
menusRoutes.get('/', menuController.index);

// Create a restaurant
menusRoutes.post('/', menuController.create);

// Update the restaurant data
menusRoutes.put('/', menuController.update);

export default menusRoutes;
