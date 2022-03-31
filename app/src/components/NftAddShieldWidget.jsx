import * as React from "react";
import { PlasmicNftAddShieldWidget } from "./plasmic/shield_ecosystem_app/PlasmicNftAddShieldWidget";
import { DrizzleContext } from "@drizzle/react-plugin";

function NftAddShieldWidget_(props, ref) {
  const { itemId, forgeAmount, onSubmit, ...rest} = props;
  const [amount, setAmount] = React.useState(0);

  const drizzleContext = React.useContext(DrizzleContext.Context);
  const [dataKeys, setDataKeys] = React.useState({});
  const account = drizzleContext.drizzleState.accounts[0];
  const drizzle = drizzleContext.drizzle;
  const shieldContract = drizzle.contracts.ShieldToken;
  const forgeContract = drizzle.contracts.ForgeToken;
  const stakingContract = drizzle.contracts.ShieldStaking;
  const nftContract = drizzle.contracts.ShieldNFT;

  React.useEffect(() => {
    if (itemId) {
      const shieldValue = nftContract.methods['tokenShieldValue'].cacheCall(itemId);
      const allowanceKey = forgeContract.methods['allowance'].cacheCall(account,  nftContract.address);
      setDataKeys({ shieldValue, shieldValue, allowance: allowanceKey });
    }
  }, [itemId, account]);

  const shieldValue = drizzleContext.drizzleState.contracts.ShieldNFT.tokenShieldValue[dataKeys.shieldValue]?.value/100 | 0;
  const maxAllowance = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
  const allowanceAmount = drizzleContext.drizzleState.contracts.ForgeToken.allowance[dataKeys.allowance]?.value;

  return <PlasmicNftAddShieldWidget 
    variants= {{ 
      approve: allowanceAmount == 0
    }}
    descText={`Add up to ${forgeAmount/100} Power to Shield`}
    amountInput= {{
      onChange: (e) => {
        setAmount(e.target.value);
      }
    }}
    mintButton= {{
      isDisabled: (amount == 0 || (amount*100) > forgeAmount) && (allowanceAmount != 0),
      onClick: () => {
        // If the user has not approved the forge contract, then approve it.
        try {
          if (allowanceAmount == 0) {
            forgeContract.methods['approve'].cacheSend(nftContract.address, maxAllowance);
            // If the user has already approved the forge contract, then mint the shield.
          } else {
            drizzle.contracts.ShieldNFT.methods['addTokenShieldValue'].cacheSend(itemId, amount*100);
            onSubmit();
          }
        } catch (error) {
          console.error(error);
        }
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

const NftAddShieldWidget = React.forwardRef(NftAddShieldWidget_);

export default NftAddShieldWidget;
