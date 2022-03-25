import * as React from "react";
import { PlasmicNavbar } from "./plasmic/generic_landing_page/PlasmicNavbar";
import { DrizzleContext } from "@drizzle/react-plugin";
function Navbar_(props, ref) {
  const drizzleContext = React.useContext(DrizzleContext.Context);
  const [dataKeys, setDataKeys] = React.useState({});
  const account = drizzleContext.drizzleState.accounts[0];
  const shieldAmount = drizzleContext.drizzleState.contracts.ShieldToken.balanceOf[dataKeys.shield]?.value | 0;
  const forgeAmount = drizzleContext.drizzleState.contracts.ForgeToken.balanceOf[dataKeys.forge]?.value | 0;
  React.useEffect(() => {
    const shieldKey = drizzleContext.drizzle.contracts.ShieldToken.methods['balanceOf'].cacheCall(account);
    const forgeKey = drizzleContext.drizzle.contracts.ForgeToken.methods['balanceOf'].cacheCall(account);
    setDataKeys({shield: shieldKey, forge: forgeKey});
  }, [account, drizzleContext.drizzle.contracts.ForgeToken.methods, drizzleContext.drizzle.contracts.ShieldToken.methods]);

  return <PlasmicNavbar 
    shieldText={`SHIELD: ${shieldAmount/100}`}
    forgeText={`FORGE: ${forgeAmount/100}`}
    root={{ ref }} 
    {...props} 
  />;
}

const Navbar = React.forwardRef(Navbar_);

export default Navbar;
