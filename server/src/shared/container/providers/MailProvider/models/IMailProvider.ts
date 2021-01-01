/**
 * Mail Provider Interface
 */

import ISendMailDTO from '../dtos/iSendMailDTO';

interface IMailProvider {
    sendMail(mailData: ISendMailDTO): Promise<void>; // Send mail
}

export default IMailProvider;
