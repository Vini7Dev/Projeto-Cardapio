/**
 * Cache Configuration
 */

import { RedisOptions } from 'ioredis';

// Cache config interface
interface ICacheConfig {
    driver: string;
    config: {
        redis: RedisOptions;
    };
}

export default {
    driver: process.env.CACHE_DRIVER,
    config: {
        redis: {
            host: 'localhost',
            port: 6379,
            password: undefined,
        },
    },
} as ICacheConfig;
