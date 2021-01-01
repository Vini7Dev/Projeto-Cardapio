/**
 * Template Mail Provider Container
 */

import { container } from 'tsyringe';
import HandlebarsTemplate from './implementations/HandlebarsTemplate';
import ITemplateMailProvider from './models/ITemplateMailProvider';

container.registerSingleton<ITemplateMailProvider>(
    'TemplateMailProvider',
    HandlebarsTemplate,
);
