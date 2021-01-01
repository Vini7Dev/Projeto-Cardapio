/**
 * Template Mail Provider Interface
 */

import ITemplateDataDTO from '../dtos/ITemplateDataDTO';

interface TemplateMailProvider {
    parse(templateData: ITemplateDataDTO): Promise<string>; // Generate a template mail
}

export default TemplateMailProvider;
