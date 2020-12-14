/**
 * Restaurant Controller
 */

import { Request, Response } from 'express';

// Controller
class RestaurantsController {
    // Create a new restaurant
    public async create(request: Request, response: Response) {
        console.log('Em desenvolvimento...');
        return response.json({ message: 'Criar Restaurante' }).status(200);
    }

    // Update the restaurant data
    public async update(request: Request, response: Response) {
        console.log('Em desenvolvimento...');
        return response.json({ message: 'Atualizar Restaurante' }).status(200);
    }
}

export default RestaurantsController;
