const { OOPS_TEXT } = require('../messages')
const { sendFrom, getBalance } = require('../rodApi')

const WITHDRAW_TEXT = 'Successful withdrawal. Check it at http://explorer1.rod.spacexpanse.org:3001/tx/'
const PROPER_AMOUNT_TEXT = 'You need provide a proper amount to be send.'
const NEED_ADDRESS_TEXT = 'Need an address as a third argument'
const NO_FUNDS = 'You dont have ROD to transfer.'
const NOT_ENOUGH_FUNDS = 'Not enough funds for this transfer. Please add some RODs.'

async function withdraw (interaction) {
  const amount = interaction.options.getInteger('amount')

  if (!amount) {
    console.log(amount)
    interaction.reply(PROPER_AMOUNT_TEXT)
    return
  }

  const toAddress = interaction.options.getString('address')

  if (!toAddress) {
    interaction.reply(NEED_ADDRESS_TEXT)
    return
  }

  const fromAccount = interaction.user.id

  try {
    const balance = await getBalance(fromAccount)
      console.log(fromAccount)
      console.log(toAddress)
    // We don't have funds...
    if (balance === 0) {
      interaction.reply(NO_FUNDS)
      return
    }
    // We don't have enough funds...
    if (balance - amount <= 0) {
      interaction.reply(NOT_ENOUGH_FUNDS)
      return
    }

    const tx = await sendFrom(fromAccount, toAddress, amount)
    console.log(fromAccount, toAddress, amount, tx)
    interaction.reply(WITHDRAW_TEXT + tx)
  } catch (err) {
    console.log(err)
    interaction.reply(OOPS_TEXT)
  }
}

module.exports = withdraw
