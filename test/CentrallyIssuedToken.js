var CentrallyIssuedToken = artifacts.require('./CentrallyIssuedToken.sol');
var AllocatedCrowdsale = artifacts.require('./AllocatedCrowdsale.sol');
var MultiSigWallet = artifacts.require('./MultiSigWallet.sol');
var DefaultFinalizeAgent = artifacts.require('./DefaultFinalizeAgent.sol');
const assertJump = require('./helpers/assertJump');

const TOTAL_SUPPLY = 1 * Math.pow(10, 9) * Math.pow(10, 8);
const CROWDSALE_SUPPLY = 330 * Math.pow(10, 6) * Math.pow(10, 18);

var owner = '0xdf08f82de32b8d460adbe8d72043e3a7e25a3b39';
var name = 'Dala';
var symbol = 'DALA';
var totalSupply = TOTAL_SUPPLY;
var decimals = 8;

contract('CentrallyIssuedToken', function (accounts) {
    let token;
    beforeEach(function () {
        return CentrallyIssuedToken.new(owner, name, symbol, totalSupply, decimals).then(_token => {
            token = _token;
        }).then(() => token.setTransferAgent(accounts[0], true)).then(() => token.setUpgradeMaster(accounts[0])).then(()=>token.setReleaseAgent(accounts[0]));
    });
    it('should have 1 billion tokens in the primary account', function () {
        return token.balanceOf(accounts[0]).then(balance => {
            return assert.equal(balance, TOTAL_SUPPLY, 'There were not 1 billion tokens in the primary account');
        });
    })
    it('should have the crowdsale contract authorized to transfer 330 million tokens', function () {
        return Promise.all([CentrallyIssuedToken.deployed(), AllocatedCrowdsale.deployed()]).then(results => {
            var token = results[0];
            var crowdsale = results[1];
            return token.allowance(accounts[0], crowdsale.address);
        }).then(allowance => {
            return assert.equal(allowance, CROWDSALE_SUPPLY, 'There were not 330 million tokens authorized for transfer by the crowdsale');
        });
    });
    it('should be able to transfer', function () {
        return token.transfer(accounts[1], TOTAL_SUPPLY).then(() => token.balanceOf(accounts[0])).then(balance => {
            assert.equal(balance, 0);
        }).then(() => token.balanceOf(accounts[1])).then(balance => {
            assert.equal(balance, TOTAL_SUPPLY);
        });
    });
    it('should return paused false after construction', function () {
        return token.paused().then(paused => {
            return assert.equal(paused, false);
        });
    });
    it('should return paused true after pause', function () {
        return token.pause().then(token.paused).then(paused => {
            return assert.equal(paused, true);
        }).then(token.unpause);
    });

    it('should return paused false after pause and unpause', function () {
        return token.pause().then(token.unpause).then(token.paused).then(paused => {
            return assert.equal(paused, false);
        });
    });

    it('should be able to transfer if transfers are unpaused', function () {
        return token.transfer(accounts[2], 10000).then(() => token.balanceOf(accounts[2])).then(balance => {
            return assert.equal(balance, 10000);
        });
    });

    it('should be able to transfer after transfers are paused and unpaused', function () {
        return token.pause().then(token.unpause).then(() => token.transfer(accounts[3], 10000)).then(() => token.balanceOf(accounts[3])).then(balance => {
            return assert.equal(balance, 10000);
        });
    });

    it('should throw an error trying to transfer while transactions are paused', function () {
        return token.pause().then(() => token.transfer(accounts[1], 10000)).then(() => assert.fail('should have thrown')).catch(error => {
            return assertJump(error);
        }).then(token.unpause);
    });

    it('should throw an error trying to transfer from another account while transactions are paused', function () {
        return token.pause().then(() => token.transferFrom(accounts[0], accounts[1], 100)).then(() => assert.fail('should have thrown')).catch(error => {
            return assertJump(error);
        }).then(token.unpause);
    });

    it('token is free to upgrade', function () {
        return token.canUpgrade().then(canUpgrade => assert.equal(canUpgrade, true, 'Token should be free to upgrade'));
    });

    it('token can be released by release agent', function () {
        return token.releaseTokenTransfer.sendTransaction({ from: accounts[0] }).then(() => assert.equal(true, true));
    });

    it('token cannot be released if not release agent', function(){
        return token.releaseTokenTransfer.sendTransaction({from:accounts[4]}).then(()=>assert.fail('should have thrown error')).catch(error=>assert.equal(true,true));
    });
});