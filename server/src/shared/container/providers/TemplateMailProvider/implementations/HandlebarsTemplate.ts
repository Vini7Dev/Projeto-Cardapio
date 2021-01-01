/**
 * Handlebars Template
 */

import fs from 'fs';
import handlebars from 'handlebars';

import ITemplateDataDTO from '../dtos/ITemplateDataDTO';
import ITemplateMailProvider from '../models/ITemplateMailProvider';

class HandlebarsTemplate implements ITemplateMailProvider {
    // Generate a template mail
    public async parse({ file, variables }: ITemplateDataDTO): Promise<string> {
        const template = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}

export default HandlebarsTemplate;
