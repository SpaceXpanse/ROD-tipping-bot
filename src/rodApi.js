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
        return firstAddress;
      }

      return axios
        .post(ROD_NODE_URL, {
          jsonrpc: '2.0',
          id: +new Date(),
          method: 'getnewaddress',
          params: [account, 'bech32'],
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

function getBalance(account) {
  return getAccountAddress(account)
    .then(function(firstAddress) {
      return axios.post(ROD_NODE_URL, {
        jsonrpc: '2.0',
        id: +new Date(),
        method: 'listunspent',
        params: [6, 9999999, [firstAddress]]
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${BASIC_AUTH_ROD_TOKEN}`
        }
      });
    })
    .then(function(result) {
      //console.log(result);
      const listunspent = result.data.result;

      if (listunspent !== null && listunspent.length > 0) {
        const amounts = listunspent.map(entry => entry.amount);
        const sum = amounts.reduce((total, amount) => total + amount, 0);
        return sum.toFixed(0); // Round the sum to 0 decimal places
      } else {
        return '0';
      }
    })
    .catch(function(error) {
      console.error('Error occurred while getting balance:', error);
    });
}

function move(fromAccount, toAccount, amount) {
  return Promise.all([getAccountAddress(fromAccount), getAccountAddress(toAccount)])
    .then(function([fromAddress, toAddress]) {
      console.log(fromAddress);
      console.log(toAddress);
      var obj1 = '{ "' + toAddress + '": ' + amount + ' }';
      var obj2 = '{ "change_address": "' + fromAddress + '" }';       
      let requestData = {
        jsonrpc: '2.0',
        id: +new Date(),
        method: 'send',
        params: [
          JSON.parse(obj1),
          null,
          "unset",
          null,
          JSON.parse(obj2)
        ]
      };
      console.log('JSON Request:', JSON.stringify(requestData));
      
      return axios.post(ROD_NODE_URL, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + BASIC_AUTH_ROD_TOKEN
        }
      })
      .then(function(result) {
        console.log(result);
        return result.data.result.txid;
      });
    });
}

function sendFrom(fromAccount, toAddress, amount) {
  return getAccountAddress(fromAccount)
    .then(function(firstAddress) {
      console.log(firstAddress)
      return axios.post(ROD_NODE_URL, {
        jsonrpc: '2.0',
        id: +new Date(),
        method: 'sendtoaddress',
        params: [toAddress, amount, 'changeaddress: ${firstAddress}']
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${BASIC_AUTH_ROD_TOKEN}`
        }
      });
    })
    .then(function(result) {
      return result.data.result;
    });
}

module.exports = {
  getAccountAddress,
  getBalance,
  move,
  sendFrom
}
