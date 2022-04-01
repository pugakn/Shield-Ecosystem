import * as React from "react";
import { PlasmicHomePage } from "./plasmic/generic_landing_page/PlasmicHomePage";
import { DrizzleContext } from "@drizzle/react-plugin";
import MarketItemCard from "./MarketItemCard";
import NftMintWidget from "./NftMintWidget";
import NftAddShieldWidget from "./NftAddShieldWidget";
import NftSellWidget from "./NftSellWidget";

function HomePage_(props, ref) {
  // Reload page if account changes
  React.useEffect(() => {
    if(window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
    }
  }, []);

  const [showMintPopUp, setShowMintPopUp] = React.useState(false);
  const [showAddShieldPopUp, setShowAddShieldPopUp] = React.useState(false);
  const [showSellPopUp, setShowSellPopUp] = React.useState(false);
  const [itemId, setItemId] = React.useState(null);

  const drizzleContext = React.useContext(DrizzleContext.Context);
  const [dataKeys, setDataKeys] = React.useState({});
  const account = drizzleContext.drizzleState.accounts[0];
  const drizzle = drizzleContext.drizzle;
  const shieldContract = drizzle.contracts.ShieldToken;
  const stakingContract = drizzle.contracts.ShieldStaking;
  const nftContract = drizzle.contracts.ShieldNFT;
  const marketplaceContract = drizzle.contracts.ShieldMarketplace;


  React.useEffect(() => {
    const balanceOf = nftContract.methods['balanceOf'].cacheCall(account);
    nftContract.methods['balanceOf'](account).call().then(numberAccountNFT => {
      let myNFTList = [];
      for (let index = 0; index < numberAccountNFT; index++) {
        const myNFTItem = nftContract.methods['tokenOfOwnerByIndex'].cacheCall(account, index);
        myNFTList.push(myNFTItem);
      }
      const marketplaceNFTs = marketplaceContract.methods['marketItemList'].cacheCall();
      const shieldKey = drizzleContext.drizzle.contracts.ShieldToken.methods['balanceOf'].cacheCall(account);
      const forgeKey = drizzleContext.drizzle.contracts.ForgeToken.methods['balanceOf'].cacheCall(account);
      setDataKeys({balanceOf, myNFTList, shield: shieldKey, forge: forgeKey, marketplaceNFTs: marketplaceNFTs });
    });
  }, []);

  const shieldAmount = drizzleContext.drizzleState.contracts.ShieldToken.balanceOf[dataKeys.shield]?.value | 0;
  const forgeAmount = drizzleContext.drizzleState.contracts.ForgeToken.balanceOf[dataKeys.forge]?.value | 0;
  
  const marketplaceNFTs = drizzleContext.drizzleState.contracts.ShieldMarketplace.marketItemList[dataKeys.marketplaceNFTs]?.value || [];
  const numberAccountNFT = drizzleContext.drizzleState.contracts.ShieldNFT.balanceOf[dataKeys.balanceOf]?.value;
  let myNFTList = [];
  for (let index = 0; index < numberAccountNFT; index++) {
    const myNFTItem = drizzleContext.drizzleState.contracts.ShieldNFT.tokenOfOwnerByIndex[dataKeys.myNFTList[index]]?.value;
    myNFTList.push(myNFTItem);
  }

  return <PlasmicHomePage 
    navbar={{ 
      forgeAmount: forgeAmount,
      shieldAmount: shieldAmount,
    }}
    mintPopUp= {{ 
      isVisible:showMintPopUp,
      onClick: () => {
        setShowMintPopUp(false);
      },
      popUpContent: <NftMintWidget onSubmit={()=> setShowMintPopUp(false)}/>
    }}
    addShieldPopUp= {{ 
      isVisible:showAddShieldPopUp,
      onClick: () => {
        setShowAddShieldPopUp(false);
      },
      popUpContent: <NftAddShieldWidget 
        forgeAmount= {forgeAmount}
        itemId= {itemId}
        onSubmit={()=> setShowAddShieldPopUp(false)}
      />
    }}
    sellPopUp= {{ 
      isVisible:showSellPopUp,
      onClick: () => {
        setShowSellPopUp(false);
      },
      popUpContent: <NftSellWidget 
        forgeAmount= {forgeAmount}
        itemId= {itemId}
        onSubmit={()=> setShowSellPopUp(false)}
      />
    }}
    mintButton={{ 
      isDisabled: false,
      onClick: () => {
        setShowMintPopUp(true);
      }
    }}
    getShieldButton={{
      onClick: (event) => {
        drizzle.contracts.ShieldTokenFreeDrop.methods['getDrop'].cacheSend();
      }
    }}
    myNftList={{
      children: myNFTList.map((item, index) => {
        return <MarketItemCard 
            key={item} profile={true} itemId={item}
            onAddShield={(_itemId) => {
              setItemId(_itemId);
              setShowAddShieldPopUp(true);
            }}
            onSell={(_itemId) => {
              setItemId(_itemId);
              setShowSellPopUp(true);
            }}
        />
      })
    }}
    marketNftList={{
      children: marketplaceNFTs.map((item, index) => {
        return <MarketItemCard 
            key={item.contractTokenId} profile={false} 
            itemId={item.contractTokenId}
            price={item.price}
            marketId={item.marketId}
            onAddShield={(_itemId) => {
              setItemId(_itemId);
              setShowAddShieldPopUp(true);
            }}
            onSell={(_itemId) => {
              setItemId(_itemId);
              setShowSellPopUp(true);
            }}
        />
      })
    }}
    root={{ ref }} 
    {...props} 
  />;
}

const HomePage = React.forwardRef(HomePage_);

export default React.memo(HomePage);
