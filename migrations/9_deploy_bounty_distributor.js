var BountyDistributor = artifacts.require('./BountyDistributor.sol');
var CentrallyIssuedToken = artifacts.require('./CentrallyIssuedToken.sol');

var fs = require('fs');

module.exports = function (deployer, network) {
    if (network == 'development') {
        const beneficiary = '0xdf08f82de32b8d460adbe8d72043e3a7e25a3b39';
        const tokenAddress = CentrallyIssuedToken.address;
        deployer.deploy(BountyDistributor, CentrallyIssuedToken.address, beneficiary, [], []).then(() => {
            var token = CentrallyIssuedToken.at(CentrallyIssuedToken.address);

            var bounties = new Buffer(fs.readFileSync('./Bounties.csv')).toString().split('\n').map(line => {
                var [address, manager, twitter, questionnaire, telegram, medium, kyc, total] = line.split(',');
                return { address, total };
            });
            var distributor = BountyDistributor.at(BountyDistributor.address);

            var addresses = bounties.map(x => x.address);
            var addressBatches = [];
            while(addresses.length){
                addressBatches.push(addresses.splice(0, 50));
            }
            console.log('done addresses');
            var amounts = bounties.map(x => Number(x.total * Math.pow(10, 18)));
            var amountBatches = [];
            while(amounts.length){
                amountBatches.push(amounts.splice(0,50));
            }
            console.log('done amounts');
            var promises = addressBatches.map((batch, index)=>{
                return distributor.addBountyHunters(batch, amountBatches[index]);
            });
            console.log(promises);
            promises.unshift(token.approve(BountyDistributor.address, 4700000 * Math.pow(10, 18)));
            return Promise.all(promises);
            //return distributor.addBountyHunters(addresses, amounts);
        });
    }
}