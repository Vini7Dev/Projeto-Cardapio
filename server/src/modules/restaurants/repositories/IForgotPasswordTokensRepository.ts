/**
 * Forgot Password Tokens Repository Interface
 */

import ForgotPasswordToken from '../typeorm/entities/ForgotPasswordToken';

interface IForgotPasswordTokensRepository {
    create(restaurant_id: string): Promise<ForgotPasswordToken>; // Generate a forgot password token
    findByToken(token: string): Promise<ForgotPasswordToken | undefined>; // Find by token
}

export default IForgotPasswordTokensRepository;
