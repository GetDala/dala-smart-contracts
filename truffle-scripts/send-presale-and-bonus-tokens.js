var fs = require('fs');
var Big = require('big.js');
var web3 = require('web3');

var CentrallyIssuedToken = artifacts.require('./CentrallyIssuedToken.sol');
var presaleAndBonuses = new Buffer(fs.readFileSync('../presale-and-bonus.csv')).toString();

module.exports = function (callback) {
    var transfers = presaleAndBonuses.split('\n');
    return CentrallyIssuedToken.deployed().then(token => {
        var promises = transfers.map(transfer => {
            let [address, amount1, amount] = transfer.split(',');
            // console.log(`Transferring ${amount} DALA to ${address}`);
            // console.log('Transferring to ', address, ' the amount of ', amount1, ' which is ', amount);
            // console.log('Transferring ',amount);//,' DALA to ',address);
            // console.log(' DALA to ', address);
            // console.log('address', address);
            // console.log('DALA', amount1);
            // console.log('Samers', amount);
            // console.log('==============');
            return token.balanceOf(address).then(result=>{
                console.log(address, ',', new Big(result.toNumber()).div(Math.pow(10,18)).toFixed(18));
                return result;
            });
        });
        return Promise.all(promises);
    }).then(results => {
        console.log('done');
        return callback();
    }).catch(error => {
        console.log('error', error);
        return callback(error);
    })
}