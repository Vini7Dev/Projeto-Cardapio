/**
 * Section Routes
 */

import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SectionsController from './controllers/SectionsController';

// Create a route object
const sectionRoutes = Router();
const sectionsContoller = new SectionsController();

// Restaurant routes
// Create section
sectionRoutes.post(
    // Route
    '/',
    // Validation data
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        },
    }),
    // Run controller method
    sectionsContoller.create,
);

export default sectionRoutes;
