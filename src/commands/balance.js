const { OOPS_TEXT } = require('../messages')
const { getBalance } = require('../rodApi')

const BALANCE_TEXT = 'Balance : '

function balance(interaction) {
  const account = interaction.user.id;

  getBalance(account)
    .then(function(balance) {
      console.log(balance);
      if (balance === 0) {
        throw new Error('0');
      } else {
        interaction.reply(BALANCE_TEXT + balance.toFixed(2) + ' ROD');
      }
    })
    .catch(function(err) {
      console.log(err);
      if (err.message === '0') {
        interaction.reply('Your balance is 0.00');
      } else {
        interaction.reply(OOPS_TEXT);
      }
    });
}

module.exports = balance
