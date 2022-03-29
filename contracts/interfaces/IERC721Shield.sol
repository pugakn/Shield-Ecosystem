// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract IERC721Shield is IERC721 {
  function tokenShieldValue(uint256 tokenId) external view returns (uint256);
  function tokenCreator(uint256 tokenId) external view returns (address);
  function addTokenShieldValue(uint256 tokenId, uint256 shieldValue) external;
}