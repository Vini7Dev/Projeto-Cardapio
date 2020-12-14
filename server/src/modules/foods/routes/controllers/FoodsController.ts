/**
 * Foods Controller
 */

import { Request, Response } from 'express';

// Controler
class FoodsController {
    // Create one food
    public async create(request: Request, response: Response) {
        console.log('Em desenvolvimento...');
        return response.json({ message: 'Criar um Alimento' }).status(200);
    }

    // Update item data
    public async update(request: Request, response: Response) {
        console.log('Em desenvolvimento...');
        return response.json({ message: 'Atualizar um Alimento' }).status(200);
    }
}

export default FoodsController;
