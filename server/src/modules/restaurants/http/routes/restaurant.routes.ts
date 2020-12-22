/**
 * Restaurants Routes
 */

import { Router } from 'express';
import multer from 'multer';

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
    '/',
    uploadFile.single('logo'),
    restaurantsController.create,
);

export default restaurantRoutes;
