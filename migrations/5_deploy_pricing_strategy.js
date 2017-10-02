var FlatPricing = artifacts.require('./FlatPricing.sol');

module.exports = function (deployer, network) {
  if (network == 'development') {
    var cap = 100000 * Math.pow(10, 18);
    var supply = 330000000;
    var weiPerToken = cap / supply;
    deployer.deploy(FlatPricing, weiPerToken);
  }
  if (network == 'ropsten') {
    var cap = 100000 * Math.pow(10, 18);
    var supply = 330000000;
    var weiPerToken = cap / supply;
    deployer.deploy(FlatPricing, weiPerToken);
  }
};
