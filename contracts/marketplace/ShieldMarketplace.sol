// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/drafts/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/lifecycle/Pausable.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "../interfaces/IERC721Shield.sol";

contract ShieldMarketplace is ReentrancyGuard, IERC721Receiver, Pausable, Ownable {
  struct ShieldMarketItem {
    uint256 marketId;
    uint256 contractTokenId;
    uint256 price;
    address seller;
  }
  using SafeMath for uint256;
  using SafeERC20 for IERC20;
  using Counters for Counters.Counter;
  Counters.Counter private _marketItemId;
  Counters.Counter private _activeItems;
  mapping(uint256 => ShieldMarketItem) private _idToMarketItem;

  IERC20 public forgeTokenContract;
  IERC20 public shieldTokenContract;
  IERC721Shield public shieldNFTContract;

  constructor(address _shieldTokenContract, address _shieldNFTContract, address _forgeTokenContract) public {
    forgeTokenContract = IERC20(_forgeTokenContract);
    shieldTokenContract = IERC20(_shieldTokenContract);
    shieldNFTContract = IERC721Shield(_shieldNFTContract);
  }

  function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes memory _data) public returns(bytes4) {
    return 0x150b7a02;
  }

  /* ========== VIEWS ========== */
  function marketItem(uint256 id) external view returns(ShieldMarketItem memory) {
    return _idToMarketItem[id];
  }

  function marketItemList() external view returns(ShieldMarketItem[] memory) {
    uint256 listLength = _activeItems.current();
    uint256 currentId = _marketItemId.current();
    ShieldMarketItem[] memory items = new ShieldMarketItem[](listLength);
    uint256 currentIndex = 0;
    for (uint256 i = 0; i < currentId; i++) {
      if (_idToMarketItem[i].seller != address(0)) {
        ShieldMarketItem memory currentItem = _idToMarketItem[i];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  /* ========== MUTATIVE FUNCTIONS ========== */
  function buyNFT(uint256 id) external nonReentrant whenNotPaused {
    ShieldMarketItem storage item = _idToMarketItem[id];
    // require(item.seller != msg.sender, "Can not buy your own NFT"); Removed for testing purposes
    shieldTokenContract.safeTransferFrom(msg.sender, item.seller, item.price);
    shieldNFTContract.safeTransferFrom(address(this), msg.sender, item.contractTokenId);
    delete _idToMarketItem[id];
    _activeItems.decrement();
    emit BoughtItem(id);
  }

  function removeNFT(uint256 id) external {
    ShieldMarketItem storage item = _idToMarketItem[id];
    require(item.seller == msg.sender, "NFT not from this account");
    shieldNFTContract.safeTransferFrom(address(this), item.seller, item.contractTokenId);
    delete _idToMarketItem[id];
    _activeItems.decrement();
    emit RemovedItem(id);
  }

  function addNFT(uint256 contractTokenId, uint256 price) external nonReentrant whenNotPaused {
    require(price > 0, "Price must be more than 0");
    uint256 currentShieldValue = shieldNFTContract.tokenShieldValue(contractTokenId);
    require(currentShieldValue >= price, "Need more shield");

    uint256 itemId = _marketItemId.current();
    _marketItemId.increment();
    _activeItems.increment();
  
    _idToMarketItem[itemId] =  ShieldMarketItem(
      itemId,
      contractTokenId,
      price,
      msg.sender
    );

    shieldNFTContract.safeTransferFrom(msg.sender, address(this), contractTokenId);
    emit AddedItem(itemId);
  }

  function setPrice(uint256 id, uint256 price) external {
    require(price > 0, "Price must be more than 0");
    ShieldMarketItem storage item = _idToMarketItem[id];
    uint256 currentShieldValue = shieldNFTContract.tokenShieldValue(item.contractTokenId);
    require(currentShieldValue >= price, "Need more shield");
    item.price = price;
    emit PriceSet(id, price);
  }

  function cleanAll() external onlyOwner {
    uint256 currentId = _marketItemId.current();
    for (uint256 i = 0; i < currentId; i++) {
      ShieldMarketItem storage item = _idToMarketItem[i];
      if (item.seller != address(0)) {
        shieldNFTContract.safeTransferFrom(address(this), item.seller, item.contractTokenId);
        delete _idToMarketItem[i];
        _activeItems.decrement();
      }
    }
  }

  /* ========== INTERNAL FUNCTIONS ============ */

  /* ========== EVENTS ========== */
  event AddedItem(uint256 itemId);
  event RemovedItem(uint256 itemId);
  event BoughtItem(uint256 itemId);
  event PriceSet(uint256 itemId, uint256 price);
}
