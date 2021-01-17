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
// Get item data
itemsRoutes.get(
    // Route
    '/:item_id',
    // Validation data
    celebrate({
        [Segments.PARAMS]: {
            item_id: Joi.string().uuid().required(),
        },
    }),
    // Run controller method
    itemsController.index,
);

// Create a new item
itemsRoutes.post(
    // Route
    '/',
    // Ensure authenticated middleware
    ensureAuth,
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
    // Ensure authenticated middleware
    ensureAuth,
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
        },
    }),
    // Run controller mehtod
    itemsController.update,
);

// Delete a item
itemsRoutes.delete(
    // Route
    '/:item_id',
    // Ensure authenticated middleware
    ensureAuth,
    // Validation data
    celebrate({
        [Segments.PARAMS]: {
            item_id: Joi.string().uuid().required(),
        },
    }),
    // Run controller method
    itemsController.delete,
);

export default itemsRoutes;
