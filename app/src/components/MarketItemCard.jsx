import * as React from "react";
import { PlasmicMarketItemCard } from "./plasmic/generic_landing_page/PlasmicMarketItemCard";
import { DrizzleContext } from "@drizzle/react-plugin";

function MarketItemCard_(props, ref) {
  const {itemId, onAddShield, onSell, price, marketId, ...rest} = props;
  const isProfileItem = props.profile;
  const drizzleContext = React.useContext(DrizzleContext.Context);
  const [dataKeys, setDataKeys] = React.useState({});
  const account = drizzleContext.drizzleState.accounts[0];
  const drizzle = drizzleContext.drizzle;
  const shieldContract = drizzle.contracts.ShieldToken;
  const stakingContract = drizzle.contracts.ShieldStaking;
  const nftContract = drizzle.contracts.ShieldNFT;
  const marketplaceContract = drizzle.contracts.ShieldMarketplace;

  React.useEffect(() => {
    if (itemId) {
      const shieldValue = nftContract.methods['tokenShieldValue'].cacheCall(itemId);
      const allowanceKey = shieldContract.methods['allowance'].cacheCall(account,  marketplaceContract.address);
      setDataKeys({ shieldValue, shieldValue, allowance: allowanceKey });
    }
  }, [itemId]);

  const shieldValue = (drizzleContext.drizzleState.contracts.ShieldNFT.tokenShieldValue[dataKeys.shieldValue]?.value /100).toFixed(2);
  const maxAllowance = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
  const allowanceAmount = drizzleContext.drizzleState.contracts.ShieldToken.allowance[dataKeys.allowance]?.value;
  const isAllowed = allowanceAmount != 0;

  return <PlasmicMarketItemCard 
    removeButton={{ 
      ...(!isProfileItem && {children: isAllowed ? `Buy now: ${price/100} SHIELD` : `Approve`}),
      onClick: (event) => {
        // If it is a profile item, add shield
        if (isProfileItem) {
          onAddShield(itemId);
        // If it is a market item, buy it
        } else {
          if (isAllowed) {
            marketplaceContract.methods['buyNFT'].cacheSend(marketId);
          } else {
            shieldContract.methods['approve'].cacheSend(marketplaceContract.address, maxAllowance);
          }
        }
      }
    }}
    sellButton={{
      onClick: (event) => {
        onSell(itemId);
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
