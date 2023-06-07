const { OOPS_TEXT } = require('../messages')
const { getBalance } = require('../rodApi')

const BALANCE_TEXT = 'Balance : '

function balance (interaction) {
  const account = interaction.user.id

  getBalance(account)
    .then(function (balance) {
      console.log(balance)
      interaction.reply(BALANCE_TEXT + (balance[6]).toFixed(2) + ' ROD')
    })
    .catch(function (err) {
      console.log(err)
      interaction.reply(OOPS_TEXT)
    })
}

module.exports = balance
