/**
 * Profile Controller
 */

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetProfileDataService from '../../../services/GetProfileDataService';
import UpdateProfileDataService from '../../../services/UpdateProfileDataService';

class ProfileController {
    // Get restaurant data
    public async show(request: Request, response: Response) {
        // Creating an instance of sercice to get resaturant's data
        const getProfileDataService = container.resolve(GetProfileDataService);

        // Getting restaurant's id from request params
        const restaurant_id = request.params.id;

        // Search for a restaurant
        const restaurantFinded = await getProfileDataService.execute(
            restaurant_id,
        );

        // Returing response
        return response.json(restaurantFinded).status(200);
    }

    // Update the restaurant data
    public async update(request: Request, response: Response) {
        // Creating an instance of sercice to update resaturant's data
        const updateProfileDataService = container.resolve(
            UpdateProfileDataService,
        );

        // Getting new restaurant's data from request body
        const { trade, telephone, new_password, old_password } = request.body;

        // Recover logo data from multer's request
        let logo = '';
        if (request.file) {
            logo = request.file.filename;
        }

        // Getting restaurant's id from authentication request
        const restaurant_id = request.restaurant.id;

        // Updating restaurant's data
        const restaurantData = await updateProfileDataService.execute({
            trade,
            telephone,
            new_password,
            old_password,
            restaurant_id,
            logo,
        });

        // Returning response
        return response.json(restaurantData).status(200);
    }
}

export default ProfileController;
