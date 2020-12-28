/**
 * Reset Password Controller
 */

import { Request, Response } from 'express';

class ResetPasswordController {
    public async create(request: Request, response: Response) {
        console.log('Em desenvolvimento');
        return response.json({ message: 'Reset Password' }).status(200);
    }
}

export default ResetPasswordController;
