import * as React from "react";
import { PlasmicPopUp } from "./plasmic/shield_ecosystem_app/PlasmicPopUp";

function PopUp_(props, ref) {
  const { isVisible, ...rest } = props;
  return (
    <PlasmicPopUp
      root={{
        props: { style: { display: isVisible ? "flex" : "none" } },
      }}
      {...rest}
    />
  );
}

const PopUp = React.forwardRef(PopUp_);

export default PopUp;
