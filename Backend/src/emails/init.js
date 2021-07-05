const sgMail = require('@sendgrid/mail')

let init = () => {
  const sendgridApiKey =
    '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'

  return sgMail.setApiKey(sendgridApiKey)
}

module.exports = {
  init,
}
