const sgMail = require("@sendgrid/mail")

export default initEmail = () => {
    const sendgridApiKey = "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"

    return sgMail.setApiKey(sendgridApiKey)
}



