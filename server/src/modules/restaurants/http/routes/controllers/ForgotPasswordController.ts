/**
 * Forgot Password Controller
 */

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordMailService from '../../../services/SendForgotPasswordMailService';

class ForgotPasswordController {
    public async create(request: Request, response: Response) {
        // Creating an instance of sercice to send forgot password mail
        const sendForgotPasswordMailService = container.resolve(
            SendForgotPasswordMailService,
        );

        // Getting restaurant's email from bory of the request
        const { email } = request.body;

        // Sending forgot password mail
        await sendForgotPasswordMailService.execute(email);

        // Return success response
        return response.json({ message: 'Email sended.' }).status(200);
    }
}

export default ForgotPasswordController;
