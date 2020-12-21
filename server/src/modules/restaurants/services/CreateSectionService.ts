/**
 * Create Section Service
 */

import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '../../../config/authConfig';

import Restaurant from '../typeorm/entities/Restaurant';

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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
        private restaurantsRepository: IRestaurantsRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    // Execute service
    public async execute({
        email,
        password,
    }: IServiceRequest): Promise<IServiceResponse> {
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

        // Compare restaurant's password hashed with no hashed
        const passwordIsCorrect = await this.hashProvider.compareHash(
            password,
            restaurantData.password,
        );

        // If is invalid, cancel the operation
        if (!passwordIsCorrect) {
            throw new Error('As credenciais estão incorretas');
        }

        // Getting token configuration
        const { secret, expiresIn } = authConfig.token;

        // Create Token
        const token = sign({}, secret, {
            subject: restaurantData.id,
            expiresIn,
        });

        // Returning the response
        return {
            restaurant: restaurantData,
            token,
        };
    }
}

export default CreateSectionService;
