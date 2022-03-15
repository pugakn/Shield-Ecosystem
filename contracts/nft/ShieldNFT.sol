// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/drafts/Counters.sol";
import "../interfaces/IERC721Shield.sol";

contract ShieldNFT is ERC721Full, IERC721Shield {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

   mapping(uint256 => uint256) private _tokenShieldValue;
   mapping(uint256 => address) private _tokenCreator;

  constructor() ERC721Full("ShieldNFT", "SNFT") public {
  }

  function tokenShieldValue(uint256 tokenId) external view returns (uint256) {
    require(_exists(tokenId), "tokenShieldValue: query for nonexistent token");
    return _tokenShieldValue[tokenId];
  }

  function tokenCreator(uint256 tokenId) external view returns (address) {
    require(_exists(tokenId), "tokenCreator: query for nonexistent token");
    return _tokenCreator[tokenId];
  }

  function shieldMint(string calldata tokenURI) external returns (uint256) {
      uint256 newItemId = _tokenIds.current();
      _tokenIds.increment();
      _safeMint(msg.sender, newItemId);
      _setTokenURI(newItemId, tokenURI);
      _setTokenCreator(newItemId, msg.sender);
      return newItemId;
  }

  function setTokenShieldValue(uint256 tokenId, uint256 shieldValue) external {
    _setTokenShieldValue(tokenId, shieldValue);
  }

  function _setTokenCreator(uint256 tokenId, address account) internal{
    require(_exists(tokenId), "_setTokenCreator: set of nonexistent token");
    _tokenCreator[tokenId] = account;
  }

  function _setTokenShieldValue(uint256 tokenId, uint256 shieldValue) internal {
    require(_exists(tokenId), "_setTokenShieldValue: set of nonexistent token");
    _tokenShieldValue[tokenId] = shieldValue;
  }

}
