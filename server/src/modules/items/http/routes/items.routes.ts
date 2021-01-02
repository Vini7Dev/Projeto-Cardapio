/**
 * Foods Routes
 */

import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

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
itemsRoutes.post(
    // Route
    '/',
    // Upload file
    uploadFile.single('image'),
    // Validation data
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().max(35).required(),
            description: Joi.string().required(),
            price: Joi.number().precision(10).required(),
            discount_price: Joi.number().precision(10).required(),
            enabled: Joi.boolean().required(),
            category_name: Joi.string().max(35).required(),
        },
    }),
    // Run controller method
    itemsController.create,
);

// Update a item data
itemsRoutes.put(
    // Route
    '/',
    // Upload file
    uploadFile.single('image'),
    // Validation data
    celebrate({
        [Segments.BODY]: {
            item_id: Joi.string().uuid().required(),
            title: Joi.string().max(35).required(),
            description: Joi.string().required(),
            price: Joi.number().precision(10).required(),
            discount_price: Joi.number().precision(10).required(),
            enabled: Joi.boolean().required(),
            category_name: Joi.string().max(35).required(),
        },
    }),
    // Run controller mehtod
    itemsController.update,
);

// Delete a item
itemsRoutes.delete('/:item_id', itemsController.delete);

export default itemsRoutes;
