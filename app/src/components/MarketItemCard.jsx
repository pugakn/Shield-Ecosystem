import * as React from "react";
import { PlasmicMarketItemCard } from "./plasmic/generic_landing_page/PlasmicMarketItemCard";
import { DrizzleContext } from "@drizzle/react-plugin";

function MarketItemCard_(props, ref) {
  const [nftData, setNftData] = React.useState({});

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

  const maxAllowance = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
  React.useEffect(() => {
    if (itemId) {
      const shieldValue = nftContract.methods['tokenShieldValue'].cacheCall(itemId);
      const metadata = nftContract.methods['tokenURI'](itemId).call().then(uri => {
        if (uri) {
          const requestOptions = {
            method: 'GET'
          };
          fetch(uri.replace('ipfs://', 'https://nftstorage.link/ipfs/'), requestOptions)
          .then(response => response.json())
          .then(data => {
            setNftData(data);
          });
        }
      });
      const allowanceKey = shieldContract.methods['allowance'].cacheCall(account,  marketplaceContract.address);
      setDataKeys({ shieldValue, shieldValue, allowance: allowanceKey, metadata: metadata });
    }
  }, [itemId]);

  const shieldValue = (drizzleContext.drizzleState.contracts.ShieldNFT.tokenShieldValue[dataKeys.shieldValue]?.value /100).toFixed(2);
  const allowanceAmount = drizzleContext.drizzleState.contracts.ShieldToken.allowance[dataKeys.allowance]?.value;
  const isAllowed = allowanceAmount != 0;
  return React.useMemo(() => {
    return <PlasmicMarketItemCard 
      image={{ 
        src: nftData.image ? nftData.image : 'https://via.placeholder.com/150',
      }}
      removeButton={{ 
        ...(!isProfileItem && {children: isAllowed ? `Buy now: ${price/100} SHIELD` : `Approve`}),
        onClick: (event) => {
          // If it is a profile item, add shield
          if (isProfileItem) {
            onAddShield(itemId);
          // If it is a market item, buy it
          } else {
            if (isAllowed) {
              marketplaceContract.methods['buyNFT'](marketId).send();
            } else {
              shieldContract.methods['approve'](marketplaceContract.address, maxAllowance).send();
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
      titleText= { nftData.name || 'Loading...' }
      root={{ ref }} 
      {...rest}
    />;
  }, [itemId, isAllowed, shieldValue, nftData]);
}

const MarketItemCard = React.forwardRef(MarketItemCard_);
export default MarketItemCard;
