/**
 * Mail Provider Container Controller
 */

import { container } from 'tsyringe';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import IMailProvider from './models/IMailProvider';

// Register mail provider container
container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);
