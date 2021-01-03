/**
 * Redis Cache Provider
 */

import Redis, { Redis as RedisClient } from 'ioredis';

import ICacheProvider from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
    private redisClient: RedisClient;

    constructor() {
        this.redisClient = new Redis();
    }

    // Save data in cache
    public async save(key: string, value: any): Promise<void> {
        await this.redisClient.set(key, JSON.stringify(value));
    }

    // Get data from cache
    public async recover<T>(key: string): Promise<T | undefined> {
        const findedCache = await this.redisClient.get(key);

        if (!findedCache) {
            return undefined;
        }

        const parsedCache = JSON.parse(findedCache) as T;

        return parsedCache;
    }

    // Remove data from cache
    public async invalidate(key: string): Promise<void> {
        await this.redisClient.del(key);
    }

    // Remove prefix from cache
    public async invalidatePrefix(prefix: string): Promise<void> {
        const keys = await this.redisClient.keys(`${prefix}:*`);

        const pipeline = await this.redisClient.pipeline();

        keys.forEach(key => pipeline.del(key));

        await pipeline.exec();
    }
}

export default RedisCacheProvider;
