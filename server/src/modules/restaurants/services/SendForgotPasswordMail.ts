/**
 * Send Forgot Password Mail
 */

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';
import IForgotPasswordTokensRepository from '../repositories/IForgotPasswordTokensRepository';

@injectable()
class SendForgotPasswordMail {
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
            html: `Acesse o seguinte link para a recuperação da senha: ${token}`,
        });
    }
}

export default SendForgotPasswordMail;
