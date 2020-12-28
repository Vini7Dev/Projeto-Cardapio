/**
 * Fake: Forgot Password Tokens Repository
 */

import ForgotPasswordToken from 'modules/restaurants/typeorm/entities/ForgotPasswordToken';
import IForgotPasswordTokensRepository from '../IForgotPasswordTokensRepository';

class FakeForgotPasswordTokensRepository
    implements IForgotPasswordTokensRepository {
    private lastIncrementToken = 1;

    private storage: ForgotPasswordToken[] = [];

    // Create a new token
    public async create(user_id: string): Promise<ForgotPasswordToken> {
        const token = new ForgotPasswordToken();

        token.token = this.lastIncrementToken.toString();
        token.user_id = user_id;

        this.lastIncrementToken += 1;

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
