sgMail = require('@sendgrid/mail')

const contact = ({ email, name, phone, subject, text }) => {
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

const sendWelcomeEmail = (email, name) => {
  if (process.env.STAGE !== 'test') {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    return sgMail
      .send({
        to: email,
        from: 'dynamisdev3248@gmail.com',
        subject: 'Thanks for shopping at Molla!',
        text: `
       Thank you ${name.split(' ')[0]} for shopping at Molla.
      `,
      })
      .then(() => 'success')
      .catch(err => console.log(err))
  }
}

module.exports = {
  contact,
  sendWelcomeEmail,
}
