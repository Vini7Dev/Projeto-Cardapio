/**
 * Forgot Password Tokens Repository
 */

import { getRepository, Repository } from 'typeorm';

import ForgotPasswordToken from '../entities/ForgotPasswordToken';
import IForgotPasswordTokensRepository from '../../repositories/IForgotPasswordTokensRepository';

class ForgotPasswordTokensRepository
    implements IForgotPasswordTokensRepository {
    private repository: Repository<ForgotPasswordToken>;

    // Getting forgot password tokens repository
    constructor() {
        this.repository = getRepository(ForgotPasswordToken);
    }

    // Create token
    public async create(restaurant_id: string): Promise<ForgotPasswordToken> {
        const createdToken = await this.repository.create({ restaurant_id });

        const savedToken = await this.repository.save(createdToken);

        return savedToken;
    }

    // Find by token
    public async findByToken(
        token: string,
    ): Promise<ForgotPasswordToken | undefined> {
        const findedToken = await this.repository.findOne({ where: { token } });

        return findedToken;
    }
}

export default ForgotPasswordTokensRepository;
