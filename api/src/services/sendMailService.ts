import nodemailer, { Transporter } from 'nodemailer';
import path from 'path';
import handlebars from 'handlebars';
import fs from 'fs';

class sendMailService {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

      this.client = transporter;
    })
  }
  
  async execute(to: string, subject: string, body: string) {
    const npsPath = path.resolve(__dirname, "..", "views", "email", "npMail.hbs");
    const templateFileContent = fs.readFileSync(npsPath).toString("utf-8");

    const mailTemplateParse = handlebars.compile(templateFileContent)

    const html = mailTemplateParse({
      name: to,
      title: subject,
      description: body
    })

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from:"NPS <noreplay@npos.com.br>"
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new sendMailService();