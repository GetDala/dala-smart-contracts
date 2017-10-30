## Table of Contents
* [Audit](#audit)
* [Token](#token)
* [Crowdsale](#crowdsale)
* [Wallet](#wallet)

# Audit
[Smart Contract Audit](https://www.iosiro.com/dala-token-sale-audit)
* The smart contracts were audited by [Iosiro](https://www.iosiro.com) between 5 October 2017 and 13 October 2017.

# Token
[CentrallyIssuedToken.sol](https://github.com/GetDala/dala-smart-contracts/blob/master/contracts/CentrallyIssuedToken.sol)
* The Dala ERC20 token that will be issued during the crowdsale. 
* The token is [upgradeable](https://github.com/GetDala/dala-smart-contracts/blob/master/contracts/UpgradeableToken.sol), [pausable](https://github.com/GetDala/dala-smart-contracts/blob/master/contracts/PausableToken.sol), and [releasable](https://github.com/GetDala/dala-smart-contracts/blob/master/contracts/ReleasableToken.sol). 
* Tokens will be released for transfer once the crowdsale is complete, either by expiration or all tokens have been issued.

# Crowdsale
[AllocatedCrowdsale.sol](https://github.com/GetDala/dala-smart-contracts/blob/master/contracts/AllocatedCrowdsale.sol)
* The crowdsale is based on the [TokenMarket AllocatedCrowdsale](https://github.com/TokenMarketNet/ico/blob/master/contracts/AllocatedCrowdsale.sol) contract with some alterations to support whitelisting and a dynamic ETH cap per user that increases over time.

# Wallet
[MultiSigWalletWithDailyLimit.sol](https://github.com/GetDala/dala-smart-contracts/blob/master/contracts/MultiSigWalletWithDailyLimit.sol)
* The wallet is based on the [Gnosis MultiSigWallet](https://github.com/gnosis/MultiSigWallet/blob/master/contracts/MultiSigWalletWithDailyLimit.sol)
