const RingToken = artifacts.require("tokens/RingToken");
const ShieldToken = artifacts.require("tokens/ShieldToken");
const ShieldStaking = artifacts.require("staking/ShieldStaking");

contract("Shield Staking", accounts => {
  it("Should transfer tokens", async () => {
    const stakingInstance = await ShieldStaking.deployed();
    const shieldInstance = await ShieldToken.deployed();

    await shieldInstance.approve(ShieldStaking.address, 200);
    await stakingInstance.stake(100, {from: accounts[0]});

    const totalSupply = await stakingInstance.totalSupply();
    assert.equal(totalSupply.toNumber(), 100, "The value 100 was not stored.");
  });
});