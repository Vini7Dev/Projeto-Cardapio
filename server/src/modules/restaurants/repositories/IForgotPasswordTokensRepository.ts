/**
 * Forgot Password Tokens Repository Interface
 */

import ForgotPasswordToken from '../typeorm/entities/ForgotPasswordToken';

interface IForgotPasswordTokensRepository {
    findByToken(token: string): Promise<ForgotPasswordToken | undefined>; // Find by token
    create(restaurant_id: string): Promise<ForgotPasswordToken>; // Generate a forgot password token
    delete(token_id: string): Promise<void>; // Deleting the token
}

export default IForgotPasswordTokensRepository;
