/**
 * Cache Provider Container Controller
 */

import { container } from 'tsyringe';

import RedisCacheProvider from './implementations/RedisCacheProvider';
import ICacheProvider from './models/ICacheProvider';

// Register cache provider container
container.registerInstance<ICacheProvider>(
    'CacheProvider',
    new RedisCacheProvider(),
);
