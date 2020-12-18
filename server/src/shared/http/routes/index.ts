/**
 * Main Routes
 */

import { Router } from 'express';
import restaurantsRoutes from '../../../modules/restaurants/http/routes/restaurant.routes';
import profileRoutes from '../../../modules/restaurants/http/routes/profile.routes';
import sectionRoutes from '../../../modules/restaurants/http/routes/section.routes';
import foodsRoutes from '../../../modules/foods/http/routes/foods.routes';
import menuItems from '../../../modules/menuItems/http/routes/menuItems.routes';

// Creating a router object
const routes = Router();

// Create routes
routes.use('/restaurants', restaurantsRoutes);
routes.use('/profile', profileRoutes);
routes.use('/section', sectionRoutes);
routes.use('/foods', foodsRoutes);
routes.use('/menus', menuItems);

export default routes;
