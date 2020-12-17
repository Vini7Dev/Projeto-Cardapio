/**
 * Restaurant Controller
 */

import { Request, Response } from 'express';

import RestaurantsRepository from '../../typeorm/repositories/RestaurantsRepository';

import GetAllRestaurantsService from '../../services/GetAllRestaurantsService';
import CreateRestaurantService from '../../services/CreateRestaurantService';

// Controller
class RestaurantsController {
    // List restaurants
    public async index(request: Request, response: Response) {
        try {
            // Creating an instance of sercice to list resaturants
            const getAllRestaurantsService = new GetAllRestaurantsService(
                new RestaurantsRepository(),
            );

            // Executing service
            const allRestaurants = await getAllRestaurantsService.execute();

            // Returning response
            return response.json({ result: allRestaurants }).status(200);
        } catch (error) {
            // When an error occurs
            return response.json({ error }).status(400);
        }
    }

    // Create a new restaurant
    public async create(request: Request, response: Response) {
        try {
            // Creating an instance of service to create an restaurant
            const createRestaurantService = new CreateRestaurantService(
                new RestaurantsRepository(),
            );

            // Recover request body data
            const restaurantData = request.body;

            // Executing the service
            const restaurant = await createRestaurantService.execute(
                restaurantData,
            );

            // Returning response
            return response.json(restaurant).status(200);
        } catch (error) {
            // When an error occurs
            return response.json({ error }).status(400);
        }
    }
}

export default RestaurantsController;
