/**
 * Password Routes
 */

import { Router } from 'express';

import ForgotPasswordController from './controllers/ForgotPasswordController';
import ResetPasswordController from './controllers/ResetPasswordController';

// Create a route object
const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

// Password Routes
// Forgot password
passwordRoutes.post('/forgot', forgotPasswordController.create);

// Reset Password
passwordRoutes.post('/reset', resetPasswordController.create);

export default passwordRoutes;
