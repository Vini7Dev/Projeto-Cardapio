/**
 * Foods Routes
 */

import { Router } from 'express';
import multer from 'multer';

import ensureAuth from '../../../restaurants/http/middlewares/ensureAuth';
import uploadConfig from '../../../../config/uploadConfig';

import ItemsController from './controllers/ItemsController';

// Create upload middleware config
const uploadFile = multer(uploadConfig);

// Create a route object
const itemsRoutes = Router();
const itemsController = new ItemsController();

// Items routes
// Ensure Authenticated Middleware
itemsRoutes.use(ensureAuth);

// Create a new item
itemsRoutes.post('/', uploadFile.single('image'), itemsController.create);

// Update a item data
itemsRoutes.put('/', uploadFile.single('image'), itemsController.update);

// Delete a item
itemsRoutes.delete('/:item_id', itemsController.delete);

export default itemsRoutes;
