const RingToken = artifacts.require("tokens/RingToken");

contract("RingToken", accounts => {
  it("Should transfer tokens", async () => {
    const instance = await RingToken.deployed();
    await instance.transfer(accounts[1], 100);

    const balance0 = await instance.balanceOf(accounts[1]);
    assert.equal(balance0.toNumber(), 100, "The value 100 was not stored.");
  });
});
