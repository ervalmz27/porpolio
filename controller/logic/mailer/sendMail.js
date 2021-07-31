const nodemailer = require('nodemailer');
const ejs = require('ejs');

class Mailer {
  constructor(pathFile, recipient, subject, data) {
    this.pathFile = pathFile;
    this.recipient = recipient;
    this.subject = subject;
    this.data = data;
  }

  async send() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.googlemail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@ambyx.io',
        pass: 'rWv42_F8d@CFJ8wKvo8.XJCEhm6',
      },
    });

    const sender = `no-reply@ambyx.com`;
    const data = await ejs.renderFile(this.pathFile, { data: this.data });

    const mainOptions = {
      from: sender,
      to: this.recipient,
      subject: this.subject,
      html: data,
    };

    transporter.sendMail(mainOptions);
  }
}

module.exports = Mailer;
