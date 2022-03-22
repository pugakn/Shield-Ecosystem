import * as React from "react";
import { PlasmicStakeList } from "./plasmic/shield_ecosystem_app/PlasmicStakeList";

function StakeList_(props, ref) {
  return <PlasmicStakeList root={{ ref }} {...props} />;
}

const StakeList = React.forwardRef(StakeList_);

export default StakeList;
