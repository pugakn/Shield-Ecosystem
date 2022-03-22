// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 32A6R5tEk8Q2nVvJmPnVbf
// Component: W6HQB4083W
import * as React from "react";
import {
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import Navbar from "../../Navbar"; // plasmic-import: 0gh3t-IoG53DF1/component
import Section from "../../Section"; // plasmic-import: yvj2wkMAAxbuq/component
import MarketItemList from "../../MarketItemList"; // plasmic-import: ubY-OV6QCB/component
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_generic_landing_page.module.css"; // plasmic-import: 32A6R5tEk8Q2nVvJmPnVbf/projectcss
import sty from "./PlasmicProfilePage.module.css"; // plasmic-import: W6HQB4083W/css

export const PlasmicProfilePage__VariantProps = new Array();

export const PlasmicProfilePage__ArgProps = new Array();

function PlasmicProfilePage__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  return (
    <React.Fragment>
      <div className={projectcss.plasmic_page_wrapper}>
        <div
          data-plasmic-name={"root"}
          data-plasmic-override={overrides.root}
          data-plasmic-root={true}
          data-plasmic-for-node={forNode}
          className={classNames(
            projectcss.all,
            projectcss.root_reset,
            projectcss.plasmic_default_styles,
            projectcss.plasmic_tokens,
            sty.root
          )}
        >
          <Navbar
            data-plasmic-name={"navbar"}
            data-plasmic-override={overrides.navbar}
            className={classNames("__wab_instance", sty.navbar)}
          />

          <Section
            data-plasmic-name={"section"}
            data-plasmic-override={overrides.section}
            className={classNames("__wab_instance", sty.section)}
          >
            <MarketItemList
              data-plasmic-name={"marketItemList"}
              data-plasmic-override={overrides.marketItemList}
              className={classNames("__wab_instance", sty.marketItemList)}
            />
          </Section>
        </div>
      </div>
    </React.Fragment>
  );
}

const PlasmicDescendants = {
  root: ["root", "navbar", "section", "marketItemList"],
  navbar: ["navbar"],
  section: ["section", "marketItemList"],
  marketItemList: ["marketItemList"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicProfilePage__ArgProps,
      internalVariantPropNames: PlasmicProfilePage__VariantProps
    });

    return PlasmicProfilePage__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicProfilePage";
  } else {
    func.displayName = `PlasmicProfilePage.${nodeName}`;
  }
  return func;
}

export const PlasmicProfilePage = Object.assign(
  // Top-level PlasmicProfilePage renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    navbar: makeNodeComponent("navbar"),
    section: makeNodeComponent("section"),
    marketItemList: makeNodeComponent("marketItemList"),
    // Metadata about props expected for PlasmicProfilePage
    internalVariantProps: PlasmicProfilePage__VariantProps,
    internalArgProps: PlasmicProfilePage__ArgProps
  }
);

export default PlasmicProfilePage;
/* prettier-ignore-end */
