/**
 * Send Mail DTO
 */

import ITemplateDataDTO from '../../TemplateMailProvider/dtos/ITemplateDataDTO';

interface ISendMailDTO {
    from: {
        name: string;
        mail: string;
    };
    to: {
        name: string;
        mail: string;
    };
    subject: string;
    templateData: ITemplateDataDTO;
}

export default ISendMailDTO;
