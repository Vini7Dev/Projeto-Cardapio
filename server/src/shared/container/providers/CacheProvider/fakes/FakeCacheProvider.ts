/**
 * Fake: Cache Provider
 */

import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
    [key: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
    private cache: ICacheData = {};

    // Save data in cache
    public async save(key: string, value: any): Promise<void> {
        this.cache[key] = JSON.stringify(value);
    }

    // Get data from cache
    public async recover<T>(key: string): Promise<T | null> {
        const findedCache = this.cache[key];

        if (!findedCache) {
            return null;
        }

        const parsedCache = JSON.parse(findedCache) as T;

        return parsedCache;
    }

    // Remove data from cache
    public async invalidate(key: string): Promise<void> {
        delete this.cache[key];
    }

    // Remove prefix from cache
    public async invalidatePrefix(prefix: string): Promise<void> {
        const keys = Object.keys(this.cache).filter(key =>
            key.startsWith(`${prefix}:`),
        );

        keys.forEach(key => {
            delete this.cache[key];
        });
    }
}

export default FakeCacheProvider;
