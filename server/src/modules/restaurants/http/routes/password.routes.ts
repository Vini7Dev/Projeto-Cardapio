/**
 * Password Routes
 */

import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from './controllers/ForgotPasswordController';
import ResetPasswordController from './controllers/ResetPasswordController';

// Create a route object
const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

// Password Routes
// Forgot password
passwordRoutes.post(
    // Route
    '/forgot',
    // Validation data
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    // Run controller method
    forgotPasswordController.create,
);

// Reset Password
passwordRoutes.post(
    // Route
    '/reset',
    // Validation data
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            new_password: Joi.string().min(6).required(),
        },
    }),
    // Run controller method
    resetPasswordController.create,
);

export default passwordRoutes;
