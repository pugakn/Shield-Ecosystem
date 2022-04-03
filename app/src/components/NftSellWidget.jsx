import * as React from "react";
import { PlasmicNftSellWidget } from "./plasmic/shield_ecosystem_app/PlasmicNftSellWidget";
import { DrizzleContext } from "@drizzle/react-plugin";

function NftSellWidget_(props, ref) {
  const { itemId, forgeAmount, onSubmit, setLoading, ...rest} = props;
  const [amount, setAmount] = React.useState(0);

  const drizzleContext = React.useContext(DrizzleContext.Context);
  const [dataKeys, setDataKeys] = React.useState({});
  const account = drizzleContext.drizzleState.accounts[0];
  const drizzle = drizzleContext.drizzle;
  const shieldContract = drizzle.contracts.ShieldToken;
  const forgeContract = drizzle.contracts.ForgeToken;
  const stakingContract = drizzle.contracts.ShieldStaking;
  const nftContract = drizzle.contracts.ShieldNFT;
  const marketplaceContract = drizzle.contracts.ShieldMarketplace;

  React.useEffect(() => {
    if (itemId) {
      const shieldValue = nftContract.methods['tokenShieldValue'].cacheCall(itemId);
      const approvedKey = nftContract.methods['isApprovedForAll'].cacheCall(account,  marketplaceContract.address);
      setDataKeys({ shieldValue, shieldValue, approved: approvedKey });
    }
  }, [itemId, account]);

  const shieldValue = drizzleContext.drizzleState.contracts.ShieldNFT.tokenShieldValue[dataKeys.shieldValue]?.value/100;
  const isApproved = drizzleContext.drizzleState.contracts.ShieldNFT.isApprovedForAll[dataKeys.approved]?.value;
  return <PlasmicNftSellWidget 
    descText={`Sell for a maximum of ${shieldValue} SHIELD Tokens`}
    variants= {{
      approve: !isApproved
    }}
    priceInput= {{
      onChange: (e) => {
        setAmount(e.target.value);
      }
    }}
    sellButton={{
      isDisabled: (amount == 0 || (amount*100) > shieldValue*100) && isApproved,
      onClick: async () => {
        setLoading(true);
        try {
          // If the user has already approved the marketplace contract, then sell the NFT.
          if (isApproved) {
            onSubmit();
            await marketplaceContract.methods['addNFT'](itemId, amount*100).send();
          // If the user has not approved the marketplace contract, then approve it.
          } else {
            await nftContract.methods['setApprovalForAll'](marketplaceContract.address, true).send();
          }
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      }
    }}
    root={{
      onClick: (event) => {
        event.stopPropagation();
      } 
    }} 
    {...rest} 
  />;
}

const NftSellWidget = React.forwardRef(NftSellWidget_);

export default React.memo(NftSellWidget);
