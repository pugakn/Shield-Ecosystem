// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";

contract ForgeToken is ERC20, ERC20Mintable, ERC20Burnable, ERC20Pausable {
  string public name = "Forge token";
  string public symbol = "FORGE";
  uint256 public decimals = 2;
  uint256 public INITIAL_SUPPLY = 0;

  constructor() public {
      _mint(msg.sender, INITIAL_SUPPLY);
  }
}
