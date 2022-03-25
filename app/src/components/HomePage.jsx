import * as React from "react";
import { PlasmicHomePage } from "./plasmic/generic_landing_page/PlasmicHomePage";
import { DrizzleContext } from "@drizzle/react-plugin";

function HomePage_(props, ref) {

  const drizzleContext = React.useContext(DrizzleContext.Context);
  const [dataKeys, setDataKeys] = React.useState({});
  const account = drizzleContext.drizzleState.accounts[0];
  const drizzle = drizzleContext.drizzle;
  const shieldContract = drizzle.contracts.ShieldToken;
  const stakingContract = drizzle.contracts.ShieldStaking;
  const nftContract = drizzle.contracts.ShieldNFT;

  React.useEffect(() => {
    const balanceOf = nftContract.methods['balanceOf'].cacheCall(account);
    const numberAccountNFT = drizzleContext.drizzleState.contracts.ShieldNFT.balanceOf[balanceOf]?.value;
    let myNFTList = [];
    console.log('numberAccountNFT',balanceOf, numberAccountNFT);
    for (let index = 0; index < numberAccountNFT; index++) {
      const myNFTItem = nftContract.methods['tokenOfOwnerByIndex'].cacheCall(account, index);
      myNFTList.push(myNFTItem);
    }
    setDataKeys({ balanceOf, myNFTList });
  }, [drizzleContext.drizzleState.contracts.ShieldNFT.balanceOf]);
  
  const numberAccountNFT = drizzleContext.drizzleState.contracts.ShieldNFT.balanceOf[dataKeys.balanceOf]?.value;
  let myNFTList = [];
  for (let index = 0; index < numberAccountNFT; index++) {
    const myNFTItem = drizzleContext.drizzleState.contracts.ShieldNFT.tokenOfOwnerByIndex[dataKeys.myNFTList[index]]?.value || [];
    myNFTList.push(myNFTItem);
  }
  console.log('waaaa',numberAccountNFT, myNFTList, drizzleContext);

  return <PlasmicHomePage 
  mintPopUp= {{ 
    isVisible:true
  }}
  mintButton={{ 
    isDisabled: false,
    onClick: () => {
      console.log("mint button clicked");
    }
  }}
  myNftList={{
    children: []
  }}
  root={{ ref }} 
  {...props} 
  />;
}

const HomePage = React.forwardRef(HomePage_);

export default HomePage;
