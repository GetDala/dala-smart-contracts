## Table of Contents
* [Token](#token)
* [Crowdsale](#crowdsale)
* [Wallet](#wallet)

# Token
[CentrallyIssuedToken.sol](https://github.com/GetDala/dala-smart-contracts/blob/master/contracts/CentrallyIssuedToken.sol)
* The Dala ERC20 token that will be issued during the crowdsale. 
* The token is [upgradeable](https://github.com/GetDala/dala-smart-contracts/blob/master/contracts/UpgradeableToken.sol), [pausable](https://github.com/GetDala/dala-smart-contracts/blob/master/contracts/PausableToken.sol), and [releasable](https://github.com/GetDala/dala-smart-contracts/blob/master/contracts/ReleasableToken.sol). 
* Tokens will be released for transfer once the crowdsale is complete, either by expiration or all tokens have been issued.

# Crowdsale
[AllocatedCrowdsale.sol](https://github.com/GetDala/dala-smart-contracts/blob/master/contracts/AllocatedCrowdsale.sol)

# Wallet
[MultiSigWalletWithDailyLimit.sol](https://github.com/GetDala/dala-smart-contracts/blob/master/contracts/MultiSigWalletWithDailyLimit.sol)
