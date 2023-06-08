const axios = require('axios')
const settings = require('./settings')

const ROD_NODE_URL = `http://${settings.RPC_HOST}:${settings.RPC_PORT}`
const BASIC_AUTH_ROD_TOKEN = Buffer.from(`${settings.RPC_USER}:${settings.RPC_PASSWORD}`).toString('base64')

function getAccountAddress(account) {
  return axios.post(ROD_NODE_URL, {
    jsonrpc: '2.0',
    id: +new Date(),
    method: 'getaddressesbylabel',
    params: [account]
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${BASIC_AUTH_ROD_TOKEN}`
    }
  })
    .then(function (result) {
      console.log(result.data.result); // Log the result to the console
      return result.data.result;
    })
}

function getAccountAddress(account) {
  return axios.post(ROD_NODE_URL, {
    jsonrpc: '2.0',
    id: +new Date(),
    method: 'getaddressesbylabel',
    params: [account]
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${BASIC_AUTH_ROD_TOKEN}`
    }
  })
    .then(function (response) {
      if (response.data && response.data.result) {
        console.log(response.data.result); // Log the result to the console
        return response.data.result;
      } else {
        throw new Error('Invalid response or missing result');
      }
    })
    .catch(function (error) {
      console.error('Error fetching account address:', error);
    });
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
