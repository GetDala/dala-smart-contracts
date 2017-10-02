var AllocatedCrowdsale = artifacts.require('./AllocatedCrowdsale.sol');
var CentrallyIssuedToken = artifacts.require('./CentrallyIssuedToken.sol');
var MultiSigWalletWithDailyLimit = artifacts.require('./MultiSigWalletWithDailyLimit.sol');
var NullFinalizeAgent = artifacts.require('./NullFinalizeAgent.sol');
var DefaultFinalizeAgent = artifacts.require('./DefaultFinalizeAgent.sol');

module.exports = function (deployer, network) {
    if (network == 'development') {
        deployer.then(() => {
            Promise.all([CentrallyIssuedToken.deployed(), AllocatedCrowdsale.deployed()]).then(results => {
                var token = results[0];
                var crowdsale = results[1];
                token.approve(AllocatedCrowdsale.address, 330 * Math.pow(10, 6) * Math.pow(10, 18));
                token.setTransferAgent(MultiSigWalletWithDailyLimit.address, true);
                token.setTransferAgent(AllocatedCrowdsale.address, true);
                token.setTransferAgent(DefaultFinalizeAgent.address, true);
                token.setTransferAgent('0xdf08f82de32b8d460adbe8d72043e3a7e25a3b39', true);
                token.setReleaseAgent(DefaultFinalizeAgent.address);
                token.setUpgradeMaster(MultiSigWalletWithDailyLimit.address);
                crowdsale.setFinalizeAgent(DefaultFinalizeAgent.address);
            });
        });
    }
    if (network == 'ropsten') {
        deployer.then(() => {
            Promise.all([CentrallyIssuedToken.deployed(), AllocatedCrowdsale.deployed()]).then(results => {
                var token = results[0];
                var crowdsale = results[1];
                token.approve(AllocatedCrowdsale.address, 330 * Math.pow(10, 6) * Math.pow(10, 18));
                token.setTransferAgent(MultiSigWalletWithDailyLimit.address, true);
                token.setTransferAgent(AllocatedCrowdsale.address, true);
                token.setTransferAgent(DefaultFinalizeAgent.address, true);
                token.setTransferAgent('0x8e3e2Ae91926146a932acb242Fc8D3041dA97E73', true);
                token.setReleaseAgent(DefaultFinalizeAgent.address);
                token.setUpgradeMaster(MultiSigWalletWithDailyLimit.address);
                crowdsale.setFinalizeAgent(DefaultFinalizeAgent.address);
            });
        });
    }
}