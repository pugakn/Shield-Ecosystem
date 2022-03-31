// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/lifecycle/Pausable.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";


contract ShieldStaking is ReentrancyGuard, Pausable, Ownable {
  using SafeMath for uint256;
  using SafeERC20 for IERC20;

  /* ============== STRUCTS ============== */
  struct PaymentPromise {
    uint256 time;
    uint256 amount;
  }

  /* ========== STATE VARIABLES ========== */

  //TOKENS
  ERC20Mintable public rewardsToken;
  IERC20 public stakingToken;

  //CONFIG VARIABLES
  uint256 public rewardPerStakedToken = 1;
  uint256 public stakeDuration = 5 minutes;

  //STORAGE
  uint256 public totalSupply;

  uint256 private _paymetPromiseId = 0;
  mapping(address => PaymentPromise[]) private _accountPaymentPromises;

  /* ========== CONSTRUCTOR ========== */

  constructor(
    address _rewardsToken,
    address _shieldTokenContract
  ) public {
    rewardsToken = ERC20Mintable(_rewardsToken);
    stakingToken = IERC20(_shieldTokenContract);
  }

  /* ========== VIEWS ========== */
  function accountPaymentPromises(address account, uint256 id) external view returns(PaymentPromise memory) {
    return _accountPaymentPromises[account][id];
  }

  function accountPaymentPromises(address account) external view returns(PaymentPromise[] memory) {
    return _accountPaymentPromises[account];
  }

  /* ========== MUTATIVE FUNCTIONS ========== */
  function stake(uint256 amount) external nonReentrant whenNotPaused {
    require(amount > 0, "Cannot stake 0");
    totalSupply = totalSupply.add(amount);

    _accountPaymentPromises[msg.sender].push(PaymentPromise(now.add(stakeDuration), amount));

    stakingToken.safeTransferFrom(msg.sender, address(this), amount);
    rewardsToken.mint(msg.sender, amount.mul(rewardPerStakedToken));
    emit Staked(msg.sender, amount);
    emit ClaimedReward(msg.sender, amount.mul(rewardPerStakedToken));
  }

  function withdraw(uint256 id) external nonReentrant {
    PaymentPromise[] storage promises = _accountPaymentPromises[msg.sender];
    PaymentPromise storage payment = promises[id];
    require(now > payment.time, "Cannot withdraw right now");

    totalSupply = totalSupply.sub(payment.amount);
    stakingToken.safeTransfer(msg.sender,  payment.amount);
    emit Withdrawn(msg.sender,  payment.amount);

    // Delete payment promise
    // Pending payments Id's will change, so client should fetch the accountPaymentPromises again
    promises[id] = promises[promises.length - 1];
    promises.pop();
  }

  /* ========== RESTRICTED FUNCTIONS ========== */

  /**
   * Defines how long the staked tokens will be locked
   */
  function setStakeDuration(uint256 _stakeDuration) external onlyOwner {
    stakeDuration = _stakeDuration;
    emit StakeDurationUpdated(stakeDuration);
  }

  /**
   * Defines how much reward tokens you will get at the time of staking per each staked token
   */
  function setRewardPerStakedToken(uint256 _rewardPerStakedToken) external onlyOwner {
    rewardPerStakedToken = _rewardPerStakedToken;
    emit RewardPerStakedTokenUpdated(rewardPerStakedToken);
  }
  /* ========== PRIVATE FUNCTIONS ============ */


  /* ========== MODIFIERS ========== */


  /* ========== EVENTS ========== */

  event Staked(address indexed user, uint256 amount);
  event Withdrawn(address indexed user, uint256 amount);
  event ClaimedReward(address indexed user, uint256 reward);
  event StakeDurationUpdated(uint256 newDuration);
  event RewardPerStakedTokenUpdated(uint256 newDuration);
}


