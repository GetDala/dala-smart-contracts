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
      from: '0x8e3e2ae91926146a932acb242fc8d3041da97e73',
      network_id: "*" // Match any network id,
    },
    mainnet: {
      host: "localhost",
      port: 8545,
      from: '0x77aff9081ff30cc8c2aec665e331c25c0260b516',
      network_id: "1212126" 
    }
  }
};
