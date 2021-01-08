/**
 * Send Forgot Password Mail Service
 */

import 'reflect-metadata';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IForgotPasswordTokensRepository from '../repositories/IForgotPasswordTokensRepository';
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';

@injectable()
class SendForgotPasswordMailService {
    constructor(
        @inject('RestaurantsRepository')
        private restaurantsRepository: IRestaurantsRepository,

        @inject('ForgotPasswordTokensRepository')
        private forgotPasswordTokensRepository: IForgotPasswordTokensRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute(email: string) {
        // Check if this restaurant exists
        const restaurant = await this.restaurantsRepository.findByEmail(email);

        // Case not, cancel the operation
        if (!restaurant) {
            throw new AppError(
                'Não existe um restaurante cadastrado com este e-mail.',
            );
        }

        // Generate a recover password token
        const token = await this.forgotPasswordTokensRepository.create(
            restaurant.id,
        );

        // Getting template path for email
        const templatePath = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password_mail.hbs',
        );

        // Sending a recover password mail
        await this.mailProvider.sendMail({
            from: {
                name: 'Equipe Menue',
                mail: 'equipe@menue.com.br',
            },
            to: {
                name: restaurant.trade,
                mail: restaurant.email,
            },
            subject: '[Menue] Recuperação de senha',
            templateData: {
                file: templatePath,
                variables: {
                    name: restaurant.trade,
                    link: `http://localhost:3000/reset-password/${token.token}`,
                },
            },
        });
    }
}

export default SendForgotPasswordMailService;
