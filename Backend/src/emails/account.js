const init = require("./init")

const sendWelcomeEmail = (email, name) => {
  init().send({
    to: email,
    from: "cicerosrepublic72@gmail.com",
    subject: "Thanks for signing up!",
    text: `Welcome to the app, ${name}`,
  })
}

module.exports = {
  sendWelcomeEmail,
}
