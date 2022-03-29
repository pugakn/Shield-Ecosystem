import * as React from "react";
import { PlasmicMarketItemCard } from "./plasmic/generic_landing_page/PlasmicMarketItemCard";
import { DrizzleContext } from "@drizzle/react-plugin";

function MarketItemCard_(props, ref) {
  const {itemId, ...rest} = props;

  const drizzleContext = React.useContext(DrizzleContext.Context);
  const [dataKeys, setDataKeys] = React.useState({});
  const account = drizzleContext.drizzleState.accounts[0];
  const drizzle = drizzleContext.drizzle;
  const shieldContract = drizzle.contracts.ShieldToken;
  const stakingContract = drizzle.contracts.ShieldStaking;
  const nftContract = drizzle.contracts.ShieldNFT;

  React.useEffect(() => {
    if (itemId) {
      const shieldValue = nftContract.methods['tokenShieldValue'].cacheCall(itemId);
      setDataKeys({ shieldValue, shieldValue });
    }
  }, [itemId]);

  const shieldValue = drizzleContext.drizzleState.contracts.ShieldNFT.tokenShieldValue[dataKeys.shieldValue]?.value/100 | 0;

  return <PlasmicMarketItemCard 
    removeButton={{ 
      onClick: (event) => {
        // Add Power to Shield
        drizzle.contracts.ShieldNFT.methods['addTokenShieldValue'].cacheSend(itemId, 20);
      }
    }}
    sellButton={{
      onClick: (event) => {
        
      }
    }}
    shieldLabel={{
      amountText: shieldValue.toString(),
    }}
    root={{ ref }} 
    {...rest}
  />;
}

const MarketItemCard = React.forwardRef(MarketItemCard_);

export default MarketItemCard;
