/**
 * Template Data DTO
 */

interface ITemplateVariablesDTO {
    [key: string]: string | number;
}

interface ITemplateDataDTO {
    file: string;
    variables: ITemplateVariablesDTO;
}

export default ITemplateDataDTO;
