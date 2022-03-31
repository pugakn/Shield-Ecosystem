import * as React from "react";
import { PlasmicNavbar } from "./plasmic/generic_landing_page/PlasmicNavbar";
import { DrizzleContext } from "@drizzle/react-plugin";
function Navbar_(props, ref) {
  const {shieldAmount, forgeAmount, ...rest} = props;
  return <PlasmicNavbar 
    shieldText={`SHIELD: ${shieldAmount/100}`}
    forgeText={`FORGE: ${forgeAmount/100}`}
    root={{ ref }} 
    {...rest} 
  />;
}

const Navbar = React.forwardRef(Navbar_);

export default Navbar;
