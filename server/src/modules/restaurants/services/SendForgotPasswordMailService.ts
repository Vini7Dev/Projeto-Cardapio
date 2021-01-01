/**
 * Send Forgot Password Mail Service
 */

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';
import IForgotPasswordTokensRepository from '../repositories/IForgotPasswordTokensRepository';

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
            html: `Clique <a href="http://localhost:3000/password/reset/${token.token}>AQUI</a> para recuperar sua senha.`,
        });
    }
}

export default SendForgotPasswordMailService;
