/**
 * Reset Password Controller
 */

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ResetPasswordService from '../../../services/ResetPasswordService';

class ResetPasswordController {
    public async create(request: Request, response: Response) {
        // Creating an instance of sercice to reset restaurant's password
        const resetPasswordService = container.resolve(ResetPasswordService);

        // Getting data to reset password
        const { token, new_password } = request.body;

        // Run service to reset password
        const passwordUpdated = await resetPasswordService.execute({
            token,
            new_password,
        });

        // Returning response
        return response.json(classToClass(passwordUpdated)).status(200);
    }
}

export default ResetPasswordController;
