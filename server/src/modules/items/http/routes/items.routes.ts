/**
 * Foods Routes
 */

import { Router } from 'express';

import ensureAuth from '../../../restaurants/http/middlewares/ensureAuth';

import ItemsController from './controllers/ItemsController';

// Create a route object
const itemsRoutes = Router();
const itemsController = new ItemsController();

// Items routes
// Ensure Authenticated Middleware
itemsRoutes.use(ensureAuth);

// Create a new item
itemsRoutes.post('/', itemsController.create);

// Update a item data
itemsRoutes.put('/', itemsController.update);

// Delete a item
itemsRoutes.delete('/:id', itemsController.delete);

export default itemsRoutes;
