const Botkit = require('botkit')

const controller = Botkit.slackbot({
  debug: true
})

controller.spawn(
  {
    token: process.env.token
  }
).startRTM()

controller.hears('', 'direct_message,direct_mention,mention', (bot, message) => {
  bot.reply(message, 'hello')
})
