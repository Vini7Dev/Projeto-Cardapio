/**
 * Restaurants Routes
 */

import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '../../../../config/uploadConfig';
import RestaurantsController from './controllers/RestaurantsController';

// Create upload middleware config
const uploadFile = multer(uploadConfig);

// Create a route object
const restaurantRoutes = Router();
const restaurantsController = new RestaurantsController();

// Restaurant routes
// Create a restaurant
restaurantRoutes.post(
    // Route
    '/',
    // Upload file
    uploadFile.single('logo'),
    // Validation data
    celebrate({
        [Segments.BODY]: {
            trade: Joi.string().max(25).required(),
            cnpj: Joi.string().required().max(14).min(14),
            telephone: Joi.string().required().max(11),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        },
    }),
    // Run controller method
    restaurantsController.create,
);

export default restaurantRoutes;
