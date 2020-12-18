/**
 * Create Section Service
 */

import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import Restaurant from '../typeorm/entities/Restaurant';

interface IServiceRequest {
    email: string;

    password: string;
}

interface IServiceResponse {
    restaurant: Restaurant;
    token: string;
}

@injectable()
class CreateSectionService {
    constructor(
        @inject('RestaurantsRepository')
        private restaurantsRepository: IRestaurantsRepository
    ) {}

    // Execute service
    public async execute({
        email,
        password,
    }: IServiceRequest): Promise<IServiceResponse> {
        // Reminder
        console.error('=============CRIPTOGRAFAR AS SENHAS=============');

        // Search for a restaurant with this e-mail
        const restaurantData = await this.restaurantsRepository.findByEmail(
            email,
        );

        // If not exists, throw a new error
        if (!restaurantData) {
            throw new Error(
                'Não existe um restaurante cadastrado com este email.',
            );
        }

        // Reminder
        console.error('=============VERIFICAR SE A SENHA BATE============');

        // Create Token
        const token = sign({}, 'd8511e6f3c23fe927f582006724c933f', {
            subject: restaurantData.id,
            expiresIn: '1d',
        });

        // Returning the response
        return {
            restaurant: restaurantData,
            token,
        };
    }
}

export default CreateSectionService;
