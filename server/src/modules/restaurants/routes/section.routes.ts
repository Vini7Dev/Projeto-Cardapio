/**
 * Section Routes
 */

import { Router } from 'express';

import SectionsController from './controllers/SectionsController';

// Create a route object
const sectionRoutes = Router();
const sectionsContoller = new SectionsController();

// Restaurant routes
// Create section
sectionRoutes.post('/', sectionsContoller.create);

export default sectionRoutes;
