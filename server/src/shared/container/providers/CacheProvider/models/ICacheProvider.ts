/**
 * Cache Provider Interface
 */

interface ICacheProvider {
    save(key: string, value: any): Promise<void>; // Save data in cache
    recover<T>(key: string): Promise<T | undefined>; // Get data from cache
    invalidate(key: string): Promise<void>; // Remove data from cache
    invalidatePrefix(prefix: string): Promise<void>; // Remove prefix from cache
}

export default ICacheProvider;
