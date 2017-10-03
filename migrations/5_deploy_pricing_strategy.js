var FlatPricing = artifacts.require('./FlatPricing.sol');

module.exports = function (deployer, network) {
  if (network == 'development') {
    var weiPerToken = 350000000000000;
    deployer.deploy(FlatPricing, weiPerToken);
  }
  if (network == 'ropsten') {
    var weiPerToken = 350000000000000;
    deployer.deploy(FlatPricing, weiPerToken);
  }
};
