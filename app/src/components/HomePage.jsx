import * as React from "react";
import { PlasmicHomePage } from "./plasmic/generic_landing_page/PlasmicHomePage";
import { DrizzleContext } from "@drizzle/react-plugin";
import MarketItemCard from "./MarketItemCard";
import NftMintWidget from "./NftMintWidget";
import NftAddShieldWidget from "./NftAddShieldWidget";
import NftSellWidget from "./NftSellWidget";

import LoadingFullPage from "../non-plasmic/loadingFullPage";

function HomePage_(props, ref) {
  // Reload page if account changes
  React.useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  const [showLoading, setShowLoading] = React.useState(false);
  const [showMintPopUp, setShowMintPopUp] = React.useState(false);
  const [showAddShieldPopUp, setShowAddShieldPopUp] = React.useState(false);
  const [showSellPopUp, setShowSellPopUp] = React.useState(false);
  const [itemId, setItemId] = React.useState(null);

  const drizzleContext = React.useContext(DrizzleContext.Context);
  const [dataKeys, setDataKeys] = React.useState({});
  const [myNFTList, setMyNFTList] = React.useState([]);
  const account = drizzleContext.drizzleState.accounts[0];
  const drizzle = drizzleContext.drizzle;
  const shieldContract = drizzle.contracts.ShieldToken;
  const stakingContract = drizzle.contracts.ShieldStaking;
  const nftContract = drizzle.contracts.ShieldNFT;
  const marketplaceContract = drizzle.contracts.ShieldMarketplace;

  React.useEffect(() => {
    const nftBalance = nftContract.methods["balanceOf"].cacheCall(account);
    const marketplaceNFTs =
      marketplaceContract.methods["marketItemList"].cacheCall();
    const shieldKey =
      drizzleContext.drizzle.contracts.ShieldToken.methods[
        "balanceOf"
      ].cacheCall(account);
    const forgeKey =
      drizzleContext.drizzle.contracts.ForgeToken.methods[
        "balanceOf"
      ].cacheCall(account);
    setDataKeys({
      shield: shieldKey,
      forge: forgeKey,
      marketplaceNFTs: marketplaceNFTs,
      nftBalance: nftBalance,
    });
  }, []);

  React.useEffect(() => {
    setMyNFTList([]);
    nftContract.methods["balanceOf"](account)
      .call()
      .then(async (numberAccountNFT) => {
        let promises = [];
        for (let index = 0; index < numberAccountNFT; index++) {
          promises.push(
            await nftContract.methods["tokenOfOwnerByIndex"](
              account,
              index
            ).call()
          );
        }
        const list = await Promise.all(promises);
        setMyNFTList(list);
      });
  }, [
    drizzleContext.drizzleState.contracts.ShieldNFT.balanceOf[
      dataKeys.nftBalance
    ]?.value,
  ]);

  const shieldAmount =
    drizzleContext.drizzleState.contracts.ShieldToken.balanceOf[dataKeys.shield]
      ?.value | 0;
  const forgeAmount =
    drizzleContext.drizzleState.contracts.ForgeToken.balanceOf[dataKeys.forge]
      ?.value | 0;
  const marketplaceNFTs =
    drizzleContext.drizzleState.contracts.ShieldMarketplace.marketItemList[
      dataKeys.marketplaceNFTs
    ]?.value || [];

  console.log("update homepage");
  return (
    <div>
      {showLoading && <LoadingFullPage />}
      <PlasmicHomePage
        navbar={{
          forgeAmount: forgeAmount,
          shieldAmount: shieldAmount,
        }}
        stakeList={{ 
          props:{
            setLoading: setShowLoading
          }
        }}
        stakeCard={{
          props:{
            setLoading: setShowLoading
          }
        }}
        mintPopUp={{
          isVisible: showMintPopUp,
          onClick: () => {
            setShowMintPopUp(false);
          },
          popUpContent: (
            <NftMintWidget
              setLoading={setShowLoading}
              onSubmit={() => setShowMintPopUp(false)}
            />
          ),
        }}
        addShieldPopUp={{
          isVisible: showAddShieldPopUp,
          onClick: () => {
            setShowAddShieldPopUp(false);
          },
          popUpContent: (
            <NftAddShieldWidget
              setLoading={setShowLoading}
              forgeAmount={forgeAmount}
              itemId={itemId}
              onSubmit={() => setShowAddShieldPopUp(false)}
            />
          ),
        }}
        sellPopUp={{
          isVisible: showSellPopUp,
          onClick: () => {
            setShowSellPopUp(false);
          },
          popUpContent: (
            <NftSellWidget
              forgeAmount={forgeAmount}
              itemId={itemId}
              onSubmit={() => setShowSellPopUp(false)}
              setLoading={setShowLoading}
            />
          ),
        }}
        mintButton={{
          isDisabled: false,
          onClick: () => {
            setShowMintPopUp(true);
          },
        }}
        getShieldButton={{
          onClick: (event) => {
            drizzle.contracts.ShieldTokenFreeDrop.methods[
              "getDrop"
            ].cacheSend();
          },
        }}
        myNftList={{
          children: myNFTList.map((item, index) => {
            return (
              <MarketItemCard
                key={item}
                profile={true}
                itemId={item}
                setLoading={setShowLoading}
                onAddShield={(_itemId) => {
                  setItemId(_itemId);
                  setShowAddShieldPopUp(true);
                }}
                onSell={(_itemId) => {
                  setItemId(_itemId);
                  setShowSellPopUp(true);
                }}
              />
            );
          }),
        }}
        marketNftList={{
          children: marketplaceNFTs.map((item, index) => {
            return (
              <MarketItemCard
                key={item.contractTokenId}
                profile={false}
                itemId={item.contractTokenId}
                price={item.price}
                marketId={item.marketId}
                setLoading={setShowLoading}
                onAddShield={(_itemId) => {
                  setItemId(_itemId);
                  setShowAddShieldPopUp(true);
                }}
                onSell={(_itemId) => {
                  setItemId(_itemId);
                  setShowSellPopUp(true);
                }}
              />
            );
          }),
        }}
        root={{ ref }}
        {...props}
      />
    </div>
  );
}

const HomePage = React.forwardRef(HomePage_);
export default React.memo(HomePage);
