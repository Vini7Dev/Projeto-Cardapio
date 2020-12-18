/**
 * Ensure Authenticated
 */

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../../config/authConfig';

interface ITokenProps {
    sub: string;
    exp: number;
    iat: number;
}

// Function to ensure that the user is authenticated
const ensureAuthenticated = (request: Request, response: Response, nextFunction: NextFunction) => {
    // Getting token from request authorization
    const { authorization } = request.headers;

    // If authorization not exists, cancel the operation
    if(!authorization) {
        throw new Error('O Token não foi informado.');
    }

    // Remove 'Bearer' from token
    const [ , token ] = authorization.split(' ');

    try {
        // Getting token configuration
        const { secret } = authConfig.token;

        // Getting token data
        const decoded = verify(token, secret) as ITokenProps;

        // Separe restaurant id from token data
        const { sub: restaurant_id } = decoded;

        // Save restaurant id in request
        request.restaurant = {
            id: restaurant_id,
        };

        // Continue
        return nextFunction();
    } catch (error) {
        // When checking the token results in an error (is invalid)
        throw new Error('O token de acesso é inválido.')
    }
}

export default ensureAuthenticated;
