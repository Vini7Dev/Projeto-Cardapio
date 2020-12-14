/**
 * Foods Routes
 */

import { Router } from 'express';
import FoodsController from './controllers/FoodsController';

// Create a route object
const foodsRoutes = Router();
const foodsController = new FoodsController();

// Items routes
// Create a new item
foodsRoutes.post('/', foodsController.create);

// Update a item data
foodsRoutes.put('/', foodsController.update);

export default foodsRoutes;
