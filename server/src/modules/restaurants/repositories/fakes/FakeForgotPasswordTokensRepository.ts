/**
 * Fake: Forgot Password Tokens Repository
 */

import { uuid } from 'uuidv4';

import IForgotPasswordTokensRepository from '../IForgotPasswordTokensRepository';
import ForgotPasswordToken from '../../typeorm/entities/ForgotPasswordToken';

class FakeForgotPasswordTokensRepository
    implements IForgotPasswordTokensRepository {
    private storage: ForgotPasswordToken[] = [];

    // Create a new token
    public async create(user_id: string): Promise<ForgotPasswordToken> {
        const token = new ForgotPasswordToken();

        token.id = uuid();
        token.token = uuid();
        token.user_id = uuid();

        await this.storage.push(token);

        return token;
    }

    // Find by token
    public async findByToken(
        token: string,
    ): Promise<ForgotPasswordToken | undefined> {
        const findedToken = await this.storage.find(
            tokenElement => tokenElement.token === token,
        );

        return findedToken;
    }
}

export default FakeForgotPasswordTokensRepository;
