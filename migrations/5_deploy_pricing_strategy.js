var FlatPricing = artifacts.require('./FlatPricing.sol');

module.exports = function (deployer, network) {
  if (network == 'development') {
    var weiPerToken = 356666666666667;
    deployer.deploy(FlatPricing, weiPerToken);
  }
  if (network == 'ropsten') {
    var weiPerToken = 356666666666667;
    deployer.deploy(FlatPricing, weiPerToken);
  }
  if(network == 'mainnet'){
    var weiPerToken = 233333333333333;
    deployer.deploy(FlatPricing, weiPerToken);
  }
};
