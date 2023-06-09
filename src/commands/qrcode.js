const { OOPS_TEXT, QRCODE_TEXT } = require('../messages')
const { getAccountAddress } = require('../rodApi')
const { EmbedBuilder } = require('discord.js')

const ADDRESS_TEXT = 'You can send ROD to this address: ';

function qrcode(interaction) {
  // Transform account to recover address
  const account = interaction.user.id;

  // Call dogecoin node to have the public address
  getAccountAddress(account)
    .then(function (address) {
      // Use goqr.me API to make a beautiful QRCode
      const qrcodeurl = 'https://api.qrserver.com/v1/create-qr-code/?size=300&bgcolor=F4ECDA&color=BA9F33&margin=10&data=' + address;

      // Make an amazing rich embed message with direct image
      const embed = new EmbedBuilder()
        .setTitle(QRCODE_TEXT)
        .setColor('#BA9F33') // Color of left border
        .setDescription(`${ADDRESS_TEXT}${address}\n\nOpen this link in a new browser window: spacexpanse:rod1qjc9tygv98qc3vh0j8p5smc6ql23xvey6rpcqgw`)
        .setImage(qrcodeurl);

      // Display message
      console.log(address);
      interaction.reply({ embeds: [embed] });
    })
    .catch(function (err) {
      console.log(err);
      interaction.reply(OOPS_TEXT);
    });
}

// Display
module.exports = qrcode
