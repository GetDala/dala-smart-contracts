pragma solidity ^0.4.15;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./FractionalERC20.sol";

contract BountyDistributor is Ownable {
    address[] public bountyHunters; 
    uint[] public bounties;
    FractionalERC20 public token;
    address public beneficiary;

    event Log(string message, address addr, uint amount);

    function BountyDistributor(address _token, address _beneficiary, address[] _bountyHunters, uint[] _bounties) {
        if (_bountyHunters.length != _bounties.length) {
            revert();
        }
        token = FractionalERC20(_token);
        beneficiary = _beneficiary;
        bountyHunters = _bountyHunters;
        bounties = _bounties;
    } 

    function() payable {
        revert();
    }

    function addBountyHunter(address _bountyHunter, uint _bounty) onlyOwner {
        bountyHunters.push(_bountyHunter);
        bounties.push(_bounty);
    }

    function addBountyHunters(address[] _bountyHunters, uint[] _bounties) onlyOwner {
        if (_bountyHunters.length != _bounties.length) {
            revert();
        }
        for (uint index = 0; index < _bountyHunters.length; index++) {
            addBountyHunter(_bountyHunters[index], _bounties[index]);
        }
    }

    function assignTokens(address receiver, uint tokenAmount) private onlyOwner {
        if (!token.transferFrom(beneficiary, receiver, tokenAmount)) {
            revert();
        }
    }

    function sendTokens(uint _numTokens) onlyOwner {
        uint sent = 0;
        for (uint i = 0; i < bountyHunters.length; i++) {
            if (sent >= _numTokens) 
                break;
            if (bounties[i] > 0) {
                 assignTokens(bountyHunters[i], bounties[i]);
                 bounties[i] = 0;
                 sent += 1;
            }
        }
    }
}