/**
 * Profile Routes
 */

import { Router } from 'express';

import ProfileController from './controllers/ProfileController';

// Create a route object
const profileRoutes = Router();
const profileController = new ProfileController();

// Get restaurant data
profileRoutes.get('/', profileController.show);

// Update restaurant data
profileRoutes.put('/', profileController.update);

export default profileRoutes;
