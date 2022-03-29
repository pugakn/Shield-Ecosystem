// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

contract ShieldTokenFreeDrop {
  ERC20Mintable public shieldTokenContract;
  mapping(address => bool) public _alreadyDropped;

  constructor(address _shieldTokenContract) public {
    shieldTokenContract = ERC20Mintable(_shieldTokenContract);
  }

  function getDrop() public {
    // require(!_alreadyDropped[msg.sender]); Removed for testing purposes
    _alreadyDropped[msg.sender] = true;
    shieldTokenContract.mint(msg.sender, 100000);
  }
}
