var fs = require('fs');

var AllocatedCrowdsale = artifacts.require('./AllocatedCrowdsale.sol');

var whitelistExists = fs.existsSync('../whitelist-30112017-2.csv');
var whitelist = '';
if (whitelistExists) whitelist = new Buffer(fs.readFileSync('../whitelist-30112017-2.csv')).toString();

module.exports = function(callback){
    var addresses = whitelist.split('\n');
    return AllocatedCrowdsale.deployed().then(crowdsale => {
        return crowdsale.addAllToWhitelist(addresses, true)
    }).then(()=>{
        console.log('done');
        return callback();
    }).catch(error=>{
        console.log('error');
        console.log(error);
        return callback(error);
    });
}