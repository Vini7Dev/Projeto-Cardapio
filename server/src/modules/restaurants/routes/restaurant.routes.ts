/**
 * Restaurants Routes
 */

import { Router } from 'express';

import RestaurantsController from './controllers/RestaurantsController';

// Create a route object
const restaurantRoutes = Router();
const restaurantsController = new RestaurantsController();

// Restaurant routes
// List restaurants
restaurantRoutes.get('/', restaurantsController.index)

// Create a restaurant
restaurantRoutes.post('/', restaurantsController.create);

export default restaurantRoutes;
