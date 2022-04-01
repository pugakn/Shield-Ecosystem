const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: { // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    telosTestnet: {
      provider: () => new HDWalletProvider('key', `wss://testnet.telos.net/evm`),
      network_id: "41",
      skipDryRun: true,
      confirmations: 1,
      networkCheckTimeout: 1000000000,
      timeoutBlocks: 200000000
    }
  }
};
