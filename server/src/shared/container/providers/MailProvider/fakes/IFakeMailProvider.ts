/**
 * Fake: Mail Provider
 */

import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

class FakeMailProvider implements IMailProvider {
    private sendedMails: ISendMailDTO[] = [];

    public async sendMail(mailData: ISendMailDTO) {
        await this.sendedMails.push(mailData);
    }
}

export default FakeMailProvider;
