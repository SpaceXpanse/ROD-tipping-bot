const { GIPHY_KEY } = require('../constants')

const HELP_TEXT = '```Use with / \n' +
  'Command list : \n' +
  '  - help : This one \n' +
  '  - tip : Tip someone some RODs \n' +
  '  - balance : Get your balance \n' +
  '  - rate : Get current value (WIP) \n' +
  '  - address : Show an used wallet so you can refill your wallet \n' +
  '  - withdraw : Move coins to an external address \n' +
  '  - qrcode : Show your qrcode to receive much money \n' +
  '  - voucher : Get your RODs from your voucher card !! (Only work in private message with the bot) \n' +
  ((GIPHY_KEY !== null && GIPHY_KEY !== '') ? '  - goodboy : Wow, such reward, wow \n' : '') + '```'

function help (interaction) {
  interaction.reply(HELP_TEXT)
}

module.exports = help
