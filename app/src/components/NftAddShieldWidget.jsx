import * as React from "react";
import { PlasmicNftAddShieldWidget } from "./plasmic/shield_ecosystem_app/PlasmicNftAddShieldWidget";
import { DrizzleContext } from "@drizzle/react-plugin";

function NftAddShieldWidget_(props, ref) {
  const { itemId, forgeAmount, onSubmit, ...rest} = props;
  const [amount, setAmount] = React.useState(0);
  const [allowanceKeys, setAllowanceKeys] = React.useState({});

  const drizzleContext = React.useContext(DrizzleContext.Context);
  const [dataKeys, setDataKeys] = React.useState({});
  const account = drizzleContext.drizzleState.accounts[0];
  const drizzle = drizzleContext.drizzle;
  const shieldContract = drizzle.contracts.ShieldToken;
  const forgeContract = drizzle.contracts.ForgeToken;
  const stakingContract = drizzle.contracts.ShieldStaking;
  const nftContract = drizzle.contracts.ShieldNFT;

  React.useEffect(() => {
    const allowanceKey = forgeContract.methods['allowance'].cacheCall(account,  nftContract.address);
    setAllowanceKeys({ forge: allowanceKey });
  }, []);

  React.useEffect(() => {
    if (itemId) {
      const shieldValue = nftContract.methods['tokenShieldValue'].cacheCall(itemId);
      setDataKeys({ shieldValue, shieldValue });
    }
  }, [itemId]);

  const shieldValue = drizzleContext.drizzleState.contracts.ShieldNFT.tokenShieldValue[dataKeys.shieldValue]?.value/100 | 0;
  const maxAllowance = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
  const allowanceAmount = drizzleContext.drizzleState.contracts.ForgeToken.allowance[allowanceKeys.forge]?.value;
  const isAllowed = allowanceAmount != 0;

  return <PlasmicNftAddShieldWidget 
    variants= {{ 
      approve: !isAllowed
    }}
    descText={`Add up to ${forgeAmount/100} Power to Shield`}
    amountInput= {{
      onChange: (e) => {
        setAmount(e.target.value);
      }
    }}
    mintButton= {{
      isDisabled: (amount == 0 || (amount*100) > forgeAmount) && isAllowed,
      onClick: () => {
        // If the user has not approved the forge contract, then approve it.
        try {
          if (!isAllowed) {
            forgeContract.methods['approve'](nftContract.address, maxAllowance).send();
            // If the user has already approved the forge contract, then mint the shield.
          } else {
            drizzle.contracts.ShieldNFT.methods['addTokenShieldValue'](itemId, amount*100).send();
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

export default React.memo(NftAddShieldWidget);
