/**
 * Main Routes
 */

import { Router } from 'express';
import restaurantsRoutes from '../../../modules/restaurants/routes/restaurant.routes';
import foodsRoutes from '../../../modules/foods/routes/foods.routes';
import menusRoutes from '../../../modules/menus/routes/menus.routes';

// Creating a router object
const routes = Router();

// Create routes
routes.use('/restaurants', restaurantsRoutes);
routes.use('/foods', foodsRoutes);
routes.use('/menus', menusRoutes);

export default routes;
