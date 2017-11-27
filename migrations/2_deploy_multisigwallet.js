var MultiSigWalletWithDailyLimit = artifacts.require('./MultiSigWalletWithDailyLimit.sol');

module.exports = function (deployer, network) {
  if (network == 'development') {
    deployer.deploy(MultiSigWalletWithDailyLimit, ['0xc40a866df87e14fe9ea65d49766b8b27bef5739b', '0x7997d47a3c6480b8b6dd7650c45b997e67169b56'], 2, 0);
  }
  if (network == 'ropsten') {
    //account1
    //password = p@ssw0rd123
    //private key = aa1136bbb0d606cd96ea94753ca416b0940399c57aa1d66fd6869e9f4b7f3edd
    //address = 0x4F0A6c734AE57998b02aA9f32674Fa5A37988De6

    //account2
    //password = p@ssw0rd123
    //private key = d6741ef2d9807f0ad674c09976b59d12381323b5e7c5af0a4afda8a3281e1dfb
    //address = 0xDEE8ae658dcfbd41E0a03150D4370B3921F96870
    deployer.deploy(MultiSigWalletWithDailyLimit, ['0x4F0A6c734AE57998b02aA9f32674Fa5A37988De6', '0xDEE8ae658dcfbd41E0a03150D4370B3921F96870'], 2, 0);
  }
  if (network == 'mainnet'){
    deployer.deploy(MultiSigWalletWithDailyLimit, [
      '0x99dbe21e3bcc9b86798c6b6687120cbba3efa96f',
      '0x681202c4fe48ed3801dd1991e84f47fcffda8aff',
      '0xb57c1ac060c42c650d7838053abed6d15fa9f09f'
    ], 2, 0);
  }
};