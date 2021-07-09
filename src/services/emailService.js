const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();
const PASSWORD = process.env.GOOGLE_PASSWORD_KEY;

const sendEmail = async (verifyToken, email) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'System Contacts',
      link: 'http://localhost:3000',
    },
  });

  const template = {
    body: {
      intro: "Welcome to System Contacts! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with System Contacts, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: `http://localhost:3000/api/users/verify/${verifyToken}`,
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  const emailBody = mailGenerator.generate(template);

  const config = {
    service: 'gmail',
    auth: {
      user: 'craizy1982@gmail.com',
      pass: PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: 'craizy1982@gmail.com',
    to: email,
    subject: 'System Contacts',
    html: emailBody,
  };

  transporter
    .sendMail(emailOptions)
    .then(info => console.log(info))
    .catch(err => console.log(err));
};

module.exports = sendEmail;
