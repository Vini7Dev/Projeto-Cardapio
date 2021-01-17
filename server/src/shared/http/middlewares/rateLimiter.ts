/**
 * Rate Limiter Controller
 */

import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import AppError from '../../errors/AppError';

// Creating a client configuration
const clientConfig = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD || undefined,
});

// Creating a limiter configuration
const limiter = new RateLimiterRedis({
    storeClient: clientConfig,
    keyPrefix: 'rateLimit',
    points: 10,
    duration: 1,
});

// Creating middleware
const rateLimiter = async (
    request: Request,
    response: Response,
    nextFunction: NextFunction,
) => {
    try {
        // Try to run the request
        await limiter.consume(request.ip);

        // If accept, continue request
        return nextFunction();
    } catch {
        // Else, cancel the operation
        throw new AppError('Muitas requisições efetuadas.', 429);
    }
};

export default rateLimiter;
