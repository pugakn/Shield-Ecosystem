import Web3 from "web3";
import ShieldStaking from "./contracts/ShieldStaking.json";
import ShieldToken from "./contracts/ShieldToken.json";
import ShieldTokenFreeDrop from "./contracts/ShieldTokenFreeDrop.json";
import ForgeToken from "./contracts/ForgeToken.json";
import ShieldNFT from "./contracts/ShieldNFT.json";
import ShieldMarketplace from "./contracts/ShieldMarketplace.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3(window.ethereum || Web3.givenProvider || "ws://localhost:7545"),
  },
  contracts: [ShieldMarketplace, ShieldNFT, ForgeToken, ShieldToken, ShieldStaking, ShieldTokenFreeDrop],
  syncAlways: false,
  polls: {
    accounts: 15000,
    blocks: 10000,
  },
};

export default options;
