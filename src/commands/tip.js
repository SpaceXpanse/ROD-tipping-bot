const { OOPS_TEXT } = require('../messages')
const { getBalance, move } = require('../rodApi')

const TIP_TEXT = 'Done deal. Check it at http://explorer1.rod.spacexpanse.org:3001/tx/'
const PROPER_AMOUNT_TEXT = 'You need to provide a proper amount to be send.'
const NEED_USER_TEXT = 'Need a user as a third argument'
const NOT_ENOUGH_FUNDS = 'Not enough funds for this transfer. Please add some RODs.'

async function tip (interaction) {
  const to = interaction.options.getUser('to')

  if (!to) {
    console.log(to)
    interaction.reply(NEED_USER_TEXT)
    return
  }

  const amount = interaction.options.getInteger('amount')

  if (!amount) {
    console.log(amount)
    interaction.reply(PROPER_AMOUNT_TEXT)
    return
  }

  const fromAccount = interaction.user.id
  const toAccount = to.id //ToDo: convert to address

  try {
    const balance = await getBalance(fromAccount)
      console.log(fromAccount)
      console.log(toAccount)
    // We don't have enough funds...
    if (balance - amount <= 0) {
      interaction.reply(NOT_ENOUGH_FUNDS)
      return
    }

    await move(fromAccount, toAccount, amount)
    console.log(fromAccount, toAccount, amount, tx)
    interaction.reply(TIP_TEXT + tx)
  } catch (err) {
    console.log(err)
    interaction.reply(OOPS_TEXT)
  }
}

module.exports = tip
