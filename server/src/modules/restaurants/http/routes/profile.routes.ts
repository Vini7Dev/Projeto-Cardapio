/**
 * Profile Routes
 */

import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '../middlewares/ensureAuth';
import uploadConfig from '../../../../config/uploadConfig';

import ProfileController from './controllers/ProfileController';

// Create upload middleware config
const uploadFile = multer(uploadConfig);

// Create a route object
const profileRoutes = Router();
const profileController = new ProfileController();

// Profile Routes
// Get restaurant data
profileRoutes.get('/:id', profileController.show);

// Update restaurant data
profileRoutes.put(
    // Route
    '/',
    // Ensure restaurant's authentication
    ensureAuth,
    // Upload file
    uploadFile.single('logo'),
    // Validation data
    celebrate({
        [Segments.BODY]: {
            trade: Joi.string().max(25).required(),
            telephone: Joi.string().max(11).required(),
            new_password: Joi.string().min(6),
            current_password: Joi.string().min(6).required(),
        },
    }),
    // Run controller method
    profileController.update,
);

export default profileRoutes;
