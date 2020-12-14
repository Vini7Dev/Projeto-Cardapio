/**
 * Restaurants Routes
 */

import { Router } from 'express';

import RestaurantsController from './controllers/RestaurantsController';

// Create a route object
const restaurantRoutes = Router();
const restaurantsController = new RestaurantsController();

// Restaurant routes
// Create a restaurant
restaurantRoutes.post('/', restaurantsController.create);

// Update the restaurant data
restaurantRoutes.put('/', restaurantsController.update);

export default restaurantRoutes;
