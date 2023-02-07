export interface IMailer {
    send (to: string, subject: string, message: string): void;
}