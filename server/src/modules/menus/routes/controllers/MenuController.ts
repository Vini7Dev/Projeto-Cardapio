/**
 * Menu Controller
 */

import { Request, Response } from 'express';

// Controller
class MenuController {
    // Look for a menu
    public async index(request: Request, response: Response) {
        console.log('Em desenvolvimento...');
        return response.json({ message: 'Buscar Menu' }).status(200);
    }

    // Create a new menu
    public async create(request: Request, response: Response) {
        console.log('Em desenvolvimento...');
        return response.json({ message: 'Criar Menu' }).status(200);
    }

    // Update the menu data
    public async update(request: Request, response: Response) {
        console.log('Em desenvolvimento...');
        return response.json({ message: 'Criar Menu' }).status(200);
    }
}

export default MenuController;
