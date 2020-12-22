/**
 * Restaurant Controller
 */

import { Request, Response } from 'express';
import { container } from 'tsyringe';

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
        const restaurantData = request.body;

        // Recover logo data from multer's request
        let logo = '';
        if (request.file) {
            logo = request.file.filename;
        }

        // Executing the service
        const restaurant = await createRestaurantService.execute({
            ...restaurantData,
            logo,
        });

        // Returning response
        return response.json(restaurant).status(200);
    }
}

export default RestaurantsController;
