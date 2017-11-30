const mnemonic = require('./secret').mnemonic;
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id,
    },
    ropsten:  {
      host: "localhost",
      port: 8545,
      from: '0x69b3bb7355d49ec0cb8503ff449f8758d7866733',
      network_id: "*" // Match any network id,
    },
    mainnet: {
      host: "localhost",
      port: 8545,
      from: '0x77aff9081ff30cc8c2aec665e331c25c0260b516',
      network_id: "*" 
    },
    infuraropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/G2bbwcegsuLDEAnhkd2n")
      },
      from: '0x69b3bb7355d49ec0cb8503ff449f8758d7866733',
      gasPrice: 10000000000,
      gas: 4500000,
      network_id: 3
    },
    infuramainnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/G2bbwcegsuLDEAnhkd2n")
      },
      network_id: 1,
      gasPrice: 10000000000,
      gas: 4500000,
      from: '0x69b3bb7355d49ec0cb8503ff449f8758d7866733'
    }
  }
};
