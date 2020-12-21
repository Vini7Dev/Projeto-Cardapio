/**
 * Storage Provider Container Controller
 */

import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

// Register storage provider container
container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);
