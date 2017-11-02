var CentrallyIssuedToken = artifacts.require('./CentrallyIssuedToken.sol');
var FlatPricing = artifacts.require('./FlatPricing.sol');
var MultiSigWalletWithDailyLimit = artifacts.require('./MultiSigWalletWithDailyLimit.sol');
var AllocatedCrowdsale = artifacts.require('./AllocatedCrowdsale.sol');

const moment = require('moment');

module.exports = function (deployer, network) {
  if (network == 'development') {
    const token = CentrallyIssuedToken.address;
    const pricing = FlatPricing.address;
    const wallet = MultiSigWalletWithDailyLimit.address;
    const start = moment.utc('2017-10-15 18:00').toDate().getTime() / 1000;
    const end = moment.utc('2017-10-31 18:00').toDate().getTime() / 1000;
    const min = 0;
    const beneficiary = '0xdf08f82de32b8d460adbe8d72043e3a7e25a3b39';
    const baseEthCap = 15 * Math.pow(10,18);
    const maxEthPerAddress = 65 * Math.pow(10,18);
    deployer.deploy(AllocatedCrowdsale, token, pricing, wallet, start, end, min, beneficiary, baseEthCap, maxEthPerAddress);
  }
  if(network == 'ropsten'){
    //beneficiary account (same as token owner)
    //password = p@ssw0rd123
    //private key = 0c7af007392e513dab6bdefe69fc354565b9581fc3dbd41944099c085b76c16f
    //address = 0x8e3e2Ae91926146a932acb242Fc8D3041dA97E73
    const token = CentrallyIssuedToken.address;
    const pricing = FlatPricing.address;
    const wallet = MultiSigWalletWithDailyLimit.address;
    const start = moment.utc('2017-10-15 18:00').toDate().getTime() / 1000;
    const end = moment.utc('2017-10-31 18:00').toDate().getTime() / 1000;
    const min = 0;
    const beneficiary = '0x8e3e2Ae91926146a932acb242Fc8D3041dA97E73';
    const baseEthCap = 15 * Math.pow(10,18);
    const maxEthPerAddress = 65 * Math.pow(10,18);
    deployer.deploy(AllocatedCrowdsale, token, pricing, wallet, start, end, min, beneficiary, baseEthCap, maxEthPerAddress);
  }
};
