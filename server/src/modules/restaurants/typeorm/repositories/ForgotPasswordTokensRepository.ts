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

    // Find by token
    public async findByToken(
        token: string,
    ): Promise<ForgotPasswordToken | undefined> {
        const findedToken = await this.repository.findOne({ where: { token } });

        return findedToken;
    }

    // Create token
    public async create(restaurant_id: string): Promise<ForgotPasswordToken> {
        const createdToken = await this.repository.create({ restaurant_id });

        const savedToken = await this.repository.save(createdToken);

        return savedToken;
    }

    // Delete token
    public async delete(token_id: string): Promise<void> {
        const tokenFinded = await this.repository.findOne({
            where: { id: token_id },
        });

        if (!tokenFinded) {
            return;
        }

        await this.repository.remove(tokenFinded);
    }
}

export default ForgotPasswordTokensRepository;
