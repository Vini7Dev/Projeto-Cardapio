/**
 * Section Controller
 */

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSectionService from '../../../services/CreateSectionService';

class SectionController {
    // Creating a new section - Json Web Token
    public async create(request: Request, response: Response) {
        // Instantiate a service to create a section
        const createSectionService = container.resolve(CreateSectionService);

        // Getting credentials from request body
        const { email, password } = request.body;

        // Executing the service
        const sectionToken = await createSectionService.execute({
            email,
            password,
        });

        // Removing the password return and adding the logo_url attribute
        const parsedTokenRestaurant = {
            restaurant: classToClass(sectionToken.restaurant),
            token: sectionToken.token,
        };

        // Returning response
        return response.json(parsedTokenRestaurant).status(200);
    }
}

export default SectionController;
