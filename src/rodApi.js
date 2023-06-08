const axios = require('axios')
const settings = require('./settings')

const ROD_NODE_URL = `http://${settings.RPC_HOST}:${settings.RPC_PORT}`
const BASIC_AUTH_ROD_TOKEN = Buffer.from(`${settings.RPC_USER}:${settings.RPC_PASSWORD}`).toString('base64')

function getAccountAddress(account) {
  console.log(account)
  return axios
    .post(ROD_NODE_URL, {
      jsonrpc: '2.0',
      id: +new Date(),
      method: 'getaddressesbylabel',
      params: [account],
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${BASIC_AUTH_ROD_TOKEN}`,
      },
    })
    .then(function(result) {
      const firstAddress = Object.keys(result.data.result)[0];
      return result.data.result[firstAddress];
    });
}

function getBalance (account) {
  return axios.post(ROD_NODE_URL, {
    jsonrpc: '2.0',
    id: +new Date(),
    method: 'getbalance',
    //params: [account]
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${BASIC_AUTH_ROD_TOKEN}`
    }
  })
    .then(function (result) {
      return result.data.result
    })
}

function move (toAccount, amount) {
  return axios.post(ROD_NODE_URL, {
    jsonrpc: '2.0',
    id: +new Date(),
    method: 'sendtoaddress',
    params: [toAccount, amount]
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${BASIC_AUTH_ROD_TOKEN}`
    }
  })
    .then(function (result) {
      return result.data.result
    })
}

function sendFrom (toAddress, amount) {
  return axios.post(ROD_NODE_URL, {
    jsonrpc: '2.0',
    id: +new Date(),
    method: 'sendtoaddress',
    params: [toAddress, amount]
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${BASIC_AUTH_ROD_TOKEN}`
    }
  })
    .then(function (result) {
      return result.data.result
    })
}

module.exports = {
  getAccountAddress,
  getBalance,
  move,
  sendFrom
}
