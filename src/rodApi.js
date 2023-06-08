const axios = require('axios')
const settings = require('./settings')

const ROD_NODE_URL = `http://${settings.RPC_HOST}:${settings.RPC_PORT}`
const BASIC_AUTH_ROD_TOKEN = Buffer.from(`${settings.RPC_USER}:${settings.RPC_PASSWORD}`).toString('base64')

function getAccountAddress(account) {
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
      const addresses = result.data.result;

      if (addresses !== null && Object.keys(addresses).length > 0) {
        const firstAddress = Object.keys(addresses)[0];
        const firstAddressObject = addresses[firstAddress];
        if (Object.keys(firstAddressObject).length > 0) {
          return firstAddressObject;
        }
      }

      return axios
        .post(ROD_NODE_URL, {
          jsonrpc: '2.0',
          id: +new Date(),
          method: 'getnewaddress',
          params: [account],
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${BASIC_AUTH_ROD_TOKEN}`,
          },
        })
        .then(function(newAddressResult) {
          return newAddressResult.data.result;
        })
        .catch(function(error) {
          console.error('Error occurred while getting new address:', error);
        });
    })
    .catch(function(error) {
      console.error('Error occurred while getting account address:', error);
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
