var AllocatedCrowdsale = artifacts.require('./AllocatedCrowdsale.sol');
var CentrallyIssuedToken = artifacts.require('./CentrallyIssuedToken.sol');
var FlatPricing = artifacts.require('./FlatPricing.sol');
var MultiSigWallet = artifacts.require('./MultiSigWallet.sol');
var DefaultFinalizeAgent = artifacts.require('./DefaultFinalizeAgent.sol');
const assertJump = require('./helpers/assertJump');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const moment = require('moment');

const TOTAL_SUPPLY = 1 * Math.pow(10, 9) * Math.pow(10, 8);
const CROWDSALE_SUPPLY = 330000000 * Math.pow(10, 8);

const start = moment().add(-1, 'days').toDate().getTime() / 1000;
const end = moment().add(30, 'days').toDate().getTime() / 1000;
const min = 33000000000000000;
const baseEthCap = 10000000000000000000;
const maxEthPerAddress = 50000000000000000000;

var name = 'Dala';
var symbol = 'DALA';
var totalSupply = TOTAL_SUPPLY;
var decimals = 8;

var cap = 80000000000000000000000;
var supply = 330000000;
var weiPerToken = cap / supply;

contract('AllocatedCrowdsale', function (accounts) {
    let crowdsale;
    let token;
    let wallet;
    let pricing;
    let finalizer;
    beforeEach(function () {
        return Promise.resolve().then(() => FlatPricing.new(weiPerToken))
            .then(_pricing => {
                pricing = _pricing;
            }).then(() => MultiSigWallet.new([accounts[1], accounts[2]], 2))
            .then(_wallet => {
                wallet = _wallet
            }).then(() => CentrallyIssuedToken.new(accounts[0], name, symbol, totalSupply, decimals))
            .then(_token => {
                token = _token;
            }).then(() => token.setTransferAgent(accounts[0], true))
            .then(() => token.setUpgradeMaster(wallet.address))
            .then(() => AllocatedCrowdsale.new(token.address, pricing.address, wallet.address, start, end, min, accounts[0], baseEthCap, maxEthPerAddress))
            .then(_crowdsale => {
                crowdsale = _crowdsale;
            }).then(() => DefaultFinalizeAgent.new(token.address, crowdsale.address))
            .then(_finalizer => {
                finalizer = _finalizer;
            }).then(() => crowdsale.setFinalizeAgent(finalizer.address))
            .then(() => token.setReleaseAgent(finalizer.address))
            .then(() => token.setTransferAgent(finalizer.address, true))
            .then(() => token.setTransferAgent(crowdsale.address, true))
            .then(() => token.setTransferAgent(wallet.address, true))
            .then(() => token.approve(crowdsale.address, 33000000000000000));
    });
    it('should have the crowdsale contract authorized to transfer 330 million tokens', function () {
        return token.allowance(accounts[0], crowdsale.address).then(allowance => {
            return assert.equal(allowance, CROWDSALE_SUPPLY, 'There were not 330 million tokens authorized for transfer by the crowdsale');
        });
    });
    it('should work with the whitelist', function () {
        return crowdsale.addToWhitelist(accounts[5], true).then(() => crowdsale.sendTransaction({ from: accounts[5], value: 1000000000000 })).then(() => {
            assert.equal(true, true);
        });
    });
    it('should fail if account not in whitelist', function () {
        return crowdsale.sendTransaction({ from: accounts[5], value: 1000000000000 }).then(() => {
            assert.fail('Should have failed');
        }).catch(assertJump);
    });
    it('should forward all funds to the wallet', function () {
        return crowdsale.addToWhitelist(accounts[5], true).then(() => crowdsale.sendTransaction({ from: accounts[5], value: 1000000000000 })).then(() => {
            return getBalance(wallet.address);
        }).then(balance => {
            assert.equal(balance, 1000000000000);
        })

        function getBalance(address) {
            return new Promise((resolve, reject) => {
                web3.eth.getBalance(address, (error, result) => {
                    if (error) return reject(error);
                    return resolve(result);
                });
            });
        }
    });
    it('should prevent an address contributing more than the cap in a single transaction', function () {
        return crowdsale.addToWhitelist(accounts[1], true)
            .then(() => crowdsale.getCurrentEthCap())
            .then(cap => {
                var amount = cap + 1;
                return crowdsale.sendTransaction({ from: accounts[1], value: amount });
            }).then(() => assert.fail('should not be allowed')).catch(assertJump);
    });
    it('should prevent an address contributing more than the cap in multiple transactions', function () {
        return crowdsale.addToWhitelist(accounts[1], true)
            .then(() => crowdsale.getCurrentEthCap())
            .then(cap => {
                var amount = cap - web3.toWei(1, 'ether');
                return crowdsale.sendTransaction({ from: accounts[1], value: amount });
            }).then(() => {
                var amount = web3.toWei(2, 'ether');
                return crowdsale.sendTransaction({ from: accounts[1], value: amount });
            }).then(() => assert.fail('should not be allowed')).catch(assertJump);
    });
});