const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1)Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Verify transporter connection
  // transporter.verify((error, success) => {
  //   if (error) {
  //     console.error('Transporter Error: ', error);
  //   } else {
  //     console.log('Transporter is ready to send emails');
  //   }
  // });

  // 2) Define the email options
  const mailOptions = {
    from: `Tequiz Support <${process.env.EMAIL_ID}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Actuall send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
