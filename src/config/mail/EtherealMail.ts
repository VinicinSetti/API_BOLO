import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariable{
    [key: string]: string | number;
}

interface IParceMailTemplate{
    file: string;
    variables: ITemplateVariable;
}

interface IMailContact{
    name: string;
    email: string;
}

interface ISendMail{
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParceMailTemplate;
}

export default class EtherealMail{
    static async sendMail({to, from, subject, templateData}: ISendMail): Promise<void> {
        const accout = await nodemailer.createTestAccount();

        const mailTemplate = new HandlebarsMailTemplate();

        const transporter = nodemailer.createTransport({
            host: accout.smtp.host,
            port: accout.smtp.port,
            secure: accout.smtp.secure,
            auth: {
                user: accout.user,
                pass: accout.pass
            },
            tls: {
                rejectUnauthorized: false,
            }
        });
        
        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe API Vendas',
                address: from?.email || "equipe@apivendas.com.br"
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await mailTemplate.parse(templateData)
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}