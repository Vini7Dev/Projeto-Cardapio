/**
 * Fake: Forgot Password Tokens Repository
 */

import { uuid } from 'uuidv4';

import IForgotPasswordTokensRepository from '../IForgotPasswordTokensRepository';
import ForgotPasswordToken from '../../typeorm/entities/ForgotPasswordToken';

class FakeForgotPasswordTokensRepository
    implements IForgotPasswordTokensRepository {
    private storage: ForgotPasswordToken[] = [];

    // Find by token
    public async findByToken(
        token: string,
    ): Promise<ForgotPasswordToken | undefined> {
        const findedToken = await this.storage.find(
            tokenElement => tokenElement.token === token,
        );

        return findedToken;
    }

    // Create a new token
    public async create(restaurant_id: string): Promise<ForgotPasswordToken> {
        const token = new ForgotPasswordToken();

        token.id = uuid();
        token.token = uuid();
        token.restaurant_id = restaurant_id;
        token.created_at = new Date(Date.now());
        token.updated_at = new Date(Date.now());

        await this.storage.push(token);

        return token;
    }

    // Deleting token
    public async delete(token_id: string): Promise<void> {
        const tokenIndex = await this.storage.findIndex(
            token => token.id === token_id,
        );

        await this.storage.splice(tokenIndex, 1);
    }
}

export default FakeForgotPasswordTokensRepository;
