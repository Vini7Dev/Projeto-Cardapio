/**
 * Fake: Mail Provider
 */

import ISendMailDTO from '../dtos/iSendMailDTO';
import IMailProvider from '../models/IMailProvider';

class FakeMailProvider implements IMailProvider {
    private sendedMails: ISendMailDTO[] = [];

    public async sendMail(mailData: ISendMailDTO) {
        this.sendedMails.push(mailData);
    }
}

export default FakeMailProvider;
