/**
 * Send Mail DTO
 */

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
    html: string;
}

export default ISendMailDTO;
