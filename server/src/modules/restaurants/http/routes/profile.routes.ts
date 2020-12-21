/**
 * Profile Routes
 */

import { Router } from 'express';
import multer from 'multer';

import ensureAuth from '../middlewares/ensureAuth';
import uploadConfig from '../../../../config/uploadConfig';

import ProfileController from './controllers/ProfileController';

// Create upload middleware config
const uploadFile = multer(uploadConfig);

// Create a route object
const profileRoutes = Router();
const profileController = new ProfileController();

// Get restaurant data
profileRoutes.get('/:id', profileController.show);

// Update restaurant data
profileRoutes.put(
    '/',
    ensureAuth,
    uploadFile.single('logo'),
    profileController.update,
);

export default profileRoutes;
