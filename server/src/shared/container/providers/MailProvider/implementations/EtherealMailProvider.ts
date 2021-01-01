/**
 * Ethereal Mail Provider
 */

import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/iSendMailDTO';

class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
                tls: { rejectUnauthorized: false },
            });

            this.client = transporter;
        });
    }

    // Send email
    public async sendMail({
        from,
        to,
        subject,
        html,
    }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: `${from.name} <${from.mail}>`,
            to: `${to.name} <${to.mail}>`,
            subject,
            html,
        });

        console.log(nodemailer.getTestMessageUrl(message));
    }
}

export default EtherealMailProvider;
