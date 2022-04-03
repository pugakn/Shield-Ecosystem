import * as React from "react";
import { PlasmicStakeList } from "./plasmic/shield_ecosystem_app/PlasmicStakeList";
import { DrizzleContext } from "@drizzle/react-plugin";
import StakeItem from "./StakeItem";

function StakeList_(props, ref) {
  const drizzleContext = React.useContext(DrizzleContext.Context);
  const [dataKeys, setDataKeys] = React.useState({});
  const account = drizzleContext.drizzleState.accounts[0];
  const drizzle = drizzleContext.drizzle;
  const shieldContract = drizzle.contracts.ShieldToken;
  const stakingContract = drizzle.contracts.ShieldStaking;

  React.useEffect(() => {
    const accountPaymentPromisesKey =
      stakingContract.methods["accountPaymentPromises"].cacheCall(account);
    setDataKeys({ accountPaymentPromises: accountPaymentPromisesKey });
  }, []);

  const accountPaymentPromises =
    drizzleContext.drizzleState.contracts.ShieldStaking.accountPaymentPromises[
      dataKeys.accountPaymentPromises
    ]?.value || [];
  const now = new Date();

  return (
    <PlasmicStakeList
      children={accountPaymentPromises.map((item, index) => {
        const lockDate = new Date(item.time * 1000);
        return (
          <StakeItem
            key={index}
            shieldText={`Staked SHIELD: ${item.amount / 100}`}
            dateText={`Locked until: ${lockDate.toLocaleString()}`}
            enabled={now > lockDate}
            unstakeButton={{
              onClick: () => {
                try {
                  stakingContract.methods["withdraw"].cacheSend(index);
                } catch (error) {
                  console.error(error);
                }
              },
            }}
          />
        );
      })}
      root={{ ref }}
      {...props}
    />
  );
}

const StakeList = React.forwardRef(StakeList_);

export default StakeList;
