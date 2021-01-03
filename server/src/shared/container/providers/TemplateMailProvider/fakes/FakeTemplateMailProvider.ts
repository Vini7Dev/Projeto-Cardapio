/**
 * Fake: Template Mail Provider
 */

import ITemplateDataDTO from '../dtos/ITemplateDataDTO';
import ITemplateMailProvider from '../models/ITemplateMailProvider';

class FakeTemplateMailProvider implements ITemplateMailProvider {
    public async parse({ file, variables }: ITemplateDataDTO): Promise<string> {
        return `${file}, ${variables}`;
    }
}

export default FakeTemplateMailProvider;
