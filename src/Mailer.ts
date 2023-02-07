import { IMailer } from './IMailer';
export class Mailer implements IMailer {
    async send (to: string, subject: string, message: string) {
        console.log(to, subject, message);
    }
}
