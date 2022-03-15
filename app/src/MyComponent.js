import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  const state = drizzle.store.getState();
  console.log('staking', drizzle.contracts.ShieldStaking.address);
  console.log('market', drizzle.contracts.ShieldMarketplace.address);
  // destructure drizzle and drizzleState from props
  return (
    <div className="App">
      <div className="section">
        <h2>Active Account</h2>
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={0}
          units="ether"
          precision={3}
        />
      </div>
      <div className="section">
        <h2>Shield Token</h2>
        <p>
          <strong> Total Supply: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldToken"
            method="totalSupply"
          />
        </p>
        <p>
          <strong> Account Supply: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldToken"
            method="balanceOf"
            methodArgs={[state.accounts[0]]}
          />
        </p>
        <p>
          <strong> Stake allowance: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldToken"
            method="allowance"
            methodArgs={[state.accounts[0], drizzle.contracts.ShieldStaking.address]}
          />
        </p>
      </div>
      <div className="section">
        <h2>Forge Token</h2>
        <p>
          <strong> Total Supply: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ForgeToken"
            method="totalSupply"
          />
        </p>
        <p>
          <strong> Account Supply: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ForgeToken"
            method="balanceOf"
            methodArgs={[state.accounts[0]]}
          />
        </p>
      </div>
      <div className="section">
        <h2>Mint NFT</h2>
        <p>
          <strong> Total Supply: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldNFT"
            method="balanceOf"
            methodArgs={[state.accounts[0]]}
          />
        </p>
        {/* <p>
          <strong> First shield amount: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldNFT"
            method="tokenShieldValue"
            methodArgs={[0]}
          />
        </p> */}
        <p>
          <strong> Approve: </strong>
          <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldNFT"
            method="setApprovalForAll"
          />
          <strong> Mint: </strong>
          <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldNFT"
            method="shieldMint"
          />
        </p>
      </div>
      <div className="section">
        <h2>Market</h2>
        <p>
          <strong>first item: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldMarketplace"
            method="marketItemList"
            // methodArgs={[0]}
          />
        </p>
        <p>
          <strong> Add to market: </strong>
          <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldMarketplace"
            method="addNFT"
          />
        </p>
        <p>
          <strong> BUY market: </strong>
          <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldMarketplace"
            method="buyNFT"
          />
        </p>
      </div>
      <div className="section">
        <h2>ShieldStaking</h2>
        <p>
          <strong>stake: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldStaking"
            method="totalSupply"
          />
        </p>
        <p>
          <strong>rewards: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldStaking"
            method="rewards"
            methodArgs={[state.accounts[0]]}
          />
        </p>
        <p>
          <strong>promises: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShieldStaking"
            method="accountPaymentPromises"
            methodArgs={[state.accounts[0]]}
          />
        </p>
          <strong>approve sh: </strong>
          <ContractForm
            drizzle={drizzle}
            contract="ShieldToken"
            method="approve"
          />
          <strong>approve fo: </strong>
          <ContractForm
            drizzle={drizzle}
            contract="ForgeToken"
            method="approve"
          />
          <strong>stake: </strong>
          <ContractForm
            drizzle={drizzle}
            contract="ShieldStaking"
            method="stake"
          />
          <strong>withdraw: </strong>
          <ContractForm
            drizzle={drizzle}
            contract="ShieldStaking"
            method="withdraw"
          />
          <strong>claim: </strong>
          <ContractForm
            drizzle={drizzle}
            contract="ShieldStaking"
            method="claimReward"
          />
      </div>
    </div>
  );
};
