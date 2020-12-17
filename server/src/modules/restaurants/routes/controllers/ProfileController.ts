/**
 * Profile Controller
 */

import { Request, Response } from 'express';

class ProfileController {
    // Get restaurant data
    public async show(request: Request, response: Response) {
        console.log('Em desenvolvimento...');

        try {
            return response.json({ message: 'OK' }).status(200);
        } catch (error) {
            // When an error occurs
            return response.json({ error }).status(400);
        }
    }

    // Update the restaurant data
    public async update(request: Request, response: Response) {
        console.log('Em desenvolvimento...');

        try {
            return response.json({ message: 'OK' }).status(200);
        } catch (error) {
            // When an error occurs
            return response.json({ error }).status(400);
        }
    }
}

export default ProfileController;
