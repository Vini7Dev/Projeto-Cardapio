/**
 * Providers Container Controller
 */

import { container } from 'tsyringe';

import IHashProvider from './HashProvider/modules/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

// Register hash provider container
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
