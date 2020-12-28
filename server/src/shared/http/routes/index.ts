/**
 * Main Routes
 */

import { Router } from 'express';
import restaurantsRoutes from '../../../modules/restaurants/http/routes/restaurant.routes';
import profileRoutes from '../../../modules/restaurants/http/routes/profile.routes';
import passwordRoutes from '../../../modules/restaurants/http/routes/password.routes';
import sectionRoutes from '../../../modules/restaurants/http/routes/section.routes';
import itemsRoutes from '../../../modules/items/http/routes/items.routes';
import menuItems from '../../../modules/menu/http/routes/menuItems.routes';

// Creating a router object
const routes = Router();

// Create routes
routes.use('/restaurants', restaurantsRoutes);
routes.use('/profile', profileRoutes);
routes.use('/password', passwordRoutes);
routes.use('/section', sectionRoutes);
routes.use('/items', itemsRoutes);
routes.use('/menus', menuItems);

export default routes;
