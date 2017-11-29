var FlatPricing = artifacts.require('./FlatPricing.sol');

module.exports = function (deployer, network) {
  if (network == 'development') {
    var weiPerToken = 356666666666667;
    deployer.deploy(FlatPricing, weiPerToken);
  }
  if (network == 'ropsten' || network == 'infuraropsten') {
    var weiPerToken = 356666666666667;
    deployer.deploy(FlatPricing, weiPerToken);
  }
  if(network == 'mainnet' || network == 'infuramainnet'){
    var weiPerToken = 210000000000000;
    deployer.deploy(FlatPricing, weiPerToken);
  }
};
