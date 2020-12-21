/**
 * Providers Container Controller
 */

import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

// Register hash provider container
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
