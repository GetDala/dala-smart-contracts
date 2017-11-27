var CentrallyIssuedToken = artifacts.require('./CentrallyIssuedToken.sol');

module.exports = function (deployer, network) {
  if (network == 'development') {
    var owner = '0xdf08f82de32b8d460adbe8d72043e3a7e25a3b39';
    var name = 'Dala';
    var symbol = 'DALA';
    var totalSupply = 1 * Math.pow(10,9) * Math.pow(10,18);
    var decimals = 18;
    deployer.deploy(CentrallyIssuedToken, owner, name, symbol, totalSupply, decimals);
  }
  if(network == 'ropsten'){
    //owner account
    //password = p@ssw0rd123
    //private key = 0c7af007392e513dab6bdefe69fc354565b9581fc3dbd41944099c085b76c16f
    //address = 0x8e3e2Ae91926146a932acb242Fc8D3041dA97E73
    var owner = '0x8e3e2Ae91926146a932acb242Fc8D3041dA97E73';
    var name = 'Dala';
    var symbol = 'DALA';
    var totalSupply = 1 * Math.pow(10,9) * Math.pow(10,18);
    var decimals = 18;
    deployer.deploy(CentrallyIssuedToken, owner, name, symbol, totalSupply, decimals);
  }
  if(network == 'mainnet'){
    var owner = '0x77aff9081ff30cc8c2aec665e331c25c0260b516';
    var name = 'Dala';
    var symbol = 'DALA';
    var totalSupply = 1 * Math.pow(10,9) * Math.pow(10,18);
    var decimals = 18;
    deployer.deploy(CentrallyIssuedToken, owner, name, symbol, totalSupply, decimals);
  }
};
