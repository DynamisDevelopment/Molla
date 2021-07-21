sgMail = require('@sendgrid/mail')

const sendWelcomeEmail = ({ email, name, phone, subject, text }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  return sgMail
    .send({
      to: 'dynamisdev3248@gmail.com',
      from: 'dynamisdev3248@gmail.com',
      subject,
      text: `
      Message from ${name} at ${phone} at ${email}.

      ----------------------

      ${text}
      `,
    })
    .then(() => 'success')
    .catch(err => err)
}

module.exports = {
  sendWelcomeEmail,
}
