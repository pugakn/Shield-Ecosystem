const ShieldToken = artifacts.require("tokens/ShieldToken");
const ForgeToken = artifacts.require("tokens/ForgeToken");
const ShieldStaking = artifacts.require("staking/ShieldStaking");
const ShieldNFT = artifacts.require("nft/ShieldNFT");
const ShieldMarketplace = artifacts.require("marketplace/ShieldMarketplace");

module.exports = async function(deployer) {
  await deployer.deploy(ShieldToken);
  await deployer.deploy(ForgeToken);
  await deployer.deploy(ShieldStaking, ForgeToken.address, ShieldToken.address);
  await deployer.deploy(ShieldNFT);
  await deployer.deploy(ShieldMarketplace, ShieldToken.address, ShieldNFT.address, ForgeToken.address);
  let forgeTokenDeployed = await ForgeToken.deployed();
  await forgeTokenDeployed.addMinter(ShieldStaking.address);  
};
