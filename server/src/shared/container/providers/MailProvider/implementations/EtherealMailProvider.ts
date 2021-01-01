/**
 * Ethereal Mail Provider
 */

import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import ITemplateMailProvider from '../../TemplateMailProvider/models/ITemplateMailProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('TemplateMailProvider')
        private templateMailProvider: ITemplateMailProvider,
    ) {
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
        templateData,
    }: ISendMailDTO): Promise<void> {
        // Generate a template for email
        const htmlTemplate = await this.templateMailProvider.parse({
            file: templateData.file,
            variables: templateData.variables,
        });

        // Sending message
        const message = await this.client.sendMail({
            from: `${from.name} <${from.mail}>`,
            to: `${to.name} <${to.mail}>`,
            subject,
            html: htmlTemplate,
        });

        console.log(nodemailer.getTestMessageUrl(message));
    }
}

export default EtherealMailProvider;
