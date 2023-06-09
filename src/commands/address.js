const { OOPS_TEXT } = require('../messages')
const { getAccountAddress } = require('../rodApi')

const ADDRESS_TEXT = 'You can send ROD to this address : '

function address (interaction) {
  const account = interaction.user.id

  // Will create a new account if doesn't exist... ? Should we allow this ?
  // Yes
  getAccountAddress(account)
    .then(function (address) {
      console.log(address)
      const link = `http://explorer1.rod.spacexpanse.org:3001/address/${address}`;
      const message = `${ADDRESS_TEXT}[${address}](${link})`;
      interaction.reply(message);
    })
    .catch(function (err) {
      console.log(err)
      interaction.reply(OOPS_TEXT)
    })
}

module.exports = address
