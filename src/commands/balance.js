const { OOPS_TEXT } = require('../messages')
const { getBalance } = require('../rodApi')

const BALANCE_TEXT = 'Balance: '

function balance(interaction) {
  const account = interaction.user.id;

  getBalance(account)
    .then(function(balance) {
      console.log(balance);
      if (balance > 0) {
        interaction.reply(BALANCE_TEXT + balance + ' ROD');
      } else {
        interaction.reply('Your ROD balance is 0.00. Use /rod address to add some.');
      }
    })
    .catch(function(error) {
      interaction.reply(OOPS_TEXT);
    });
}

module.exports = balance
