import * as React from "react";
import { PlasmicNftMintWidget } from "./plasmic/shield_ecosystem_app/PlasmicNftMintWidget";
import { DrizzleContext } from "@drizzle/react-plugin";

function NftMintWidget_(props, ref) {
  const { onSubmit, ...rest} = props;
  const [title, setTitle] = React.useState("");

  const drizzleContext = React.useContext(DrizzleContext.Context);
  const drizzle = drizzleContext.drizzle;
  const nftContract = drizzle.contracts.ShieldNFT;

  return <PlasmicNftMintWidget
    titleInput={{ 
      onChange: (e) => {
        setTitle(e.target.value);
      } 
    }}
    mintButton={{ 
      onClick: async (event) => {
        await nftContract.methods['shieldMint'].cacheSend('');
        onSubmit();
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

const NftMintWidget = React.forwardRef(NftMintWidget_);

export default NftMintWidget;
