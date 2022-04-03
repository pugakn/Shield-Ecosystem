import * as React from "react";
import { PlasmicStakeCard } from "./plasmic/generic_landing_page/PlasmicStakeCard";
import { DrizzleContext } from "@drizzle/react-plugin";
import { toast } from 'react-toastify';

function StakeCard_(props, ref) {
  const {setLoading ,...rest} = props;
  const [amount, setAmount] = React.useState(0);

  const drizzleContext = React.useContext(DrizzleContext.Context);
  const [dataKeys, setDataKeys] = React.useState({});
  const account = drizzleContext.drizzleState.accounts[0];
  const drizzle = drizzleContext.drizzle;
  const shieldContract = drizzle.contracts.ShieldToken;
  const stakingContract = drizzle.contracts.ShieldStaking;

  React.useEffect(() => {
    const allowanceKey = shieldContract.methods["allowance"].cacheCall(
      account,
      stakingContract.address
    );
    setDataKeys({ allowance: allowanceKey });
  }, []);

  const maxAllowance =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";
  const allowanceAmount =
    drizzleContext.drizzleState.contracts.ShieldToken.allowance[
      dataKeys.allowance
    ]?.value;
  return (
    <PlasmicStakeCard
      variants={{
        approve: allowanceAmount == 0,
      }}
      approveButton={{
        isDisabled: !amount && allowanceAmount != 0,
        onClick: async () => {
          try {
            setLoading(true);
            if (allowanceAmount == 0) {
              await shieldContract.methods["approve"](stakingContract.address,maxAllowance).send();
            } else {
              await stakingContract.methods["stake"](amount * 100).send();
            }
          } catch (error) {
            console.error(error);
          }
          setLoading(false);
        },
      }}
      amountInput={{
        onChange: (e) => {
          setAmount(e.target.value);
        },
      }}
      root={{ ref }}
      {...rest}
    />
  );
}

const StakeCard = React.forwardRef(StakeCard_);

export default React.memo(StakeCard);
