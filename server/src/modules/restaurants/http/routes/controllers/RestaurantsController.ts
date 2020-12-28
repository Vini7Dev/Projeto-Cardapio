/**
 * Restaurant Controller
 */

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRestaurantService from '../../../services/CreateRestaurantService';

// Controller
class RestaurantsController {
    // Create a new restaurant
    public async create(request: Request, response: Response) {
        // Creating an instance of service to create an restaurant
        const createRestaurantService = container.resolve(
            CreateRestaurantService,
        );

        // Recover request body data
        const { trade, cnpj, telephone, email, password } = request.body;

        // Recover logo data from multer's request
        let logo = '';
        if (request.file) {
            logo = request.file.filename;
        }

        // Executing the service
        const restaurant = await createRestaurantService.execute({
            trade,
            cnpj,
            telephone,
            email,
            password,
            logo,
        });

        // Removing the password return and adding the logo_url attribute
        const parsedRestaurant = classToClass(restaurant);

        // Returning response
        return response.json(parsedRestaurant).status(200);
    }
}

export default RestaurantsController;
