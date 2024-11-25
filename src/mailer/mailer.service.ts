import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private async transporter() {
    const testAccount = await nodemailer.createTestAccount();
    const transport = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      ignoreTLS: true,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    return transport;
  }

  async sendSignUpConfirmation(userEmail: string) {
    const body = '<h1>Account created</h1>';
    const subject = 'Welcome';
    this.sendMailFunction(subject, body, userEmail);
  }

  async sendResetPassword(email: string, url: string, code: string) {
    const body = `
      <a href='${url}'>Reset pass</a>
      <p>Code: ${code}</p>
      <p>Code will expire in 15min</p>
    `;
    const subject = 'Reset Password';
    this.sendMailFunction(subject, body, email);
  }

  async sendMailFunction(subject: string, body: string, userEmail: string) {
    (await this.transporter()).sendMail({
      from: 'app@noreply.com',
      to: userEmail,
      subject: subject,
      html: body,
    });
  }
}
