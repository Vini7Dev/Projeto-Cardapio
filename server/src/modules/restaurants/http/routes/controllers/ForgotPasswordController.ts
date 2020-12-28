/**
 * Forgot Password Controller
 */

import { Request, Response } from 'express';

class ForgotPasswordController {
    public async create(request: Request, response: Response) {
        console.log('Em desenvolvimento');
        return response.json({ message: 'Forgot Password' }).status(200);
    }
}

export default ForgotPasswordController;
