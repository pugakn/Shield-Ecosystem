// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 32A6R5tEk8Q2nVvJmPnVbf
// Component: L5_Xmsn3V7z
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  hasVariant,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import TextInput from "../../TextInput"; // plasmic-import: TCynlQ7-fD-aqs/component
import Button from "../../Button"; // plasmic-import: i6Jk8LEazvGVYD/component
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_generic_landing_page.module.css"; // plasmic-import: 32A6R5tEk8Q2nVvJmPnVbf/projectcss
import sty from "./PlasmicStakeCard.module.css"; // plasmic-import: L5_Xmsn3V7z/css

export const PlasmicStakeCard__VariantProps = new Array("approve");

export const PlasmicStakeCard__ArgProps = new Array();

function PlasmicStakeCard__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  return (
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
      <div className={classNames(projectcss.all, sty.freeBox__umHFx)}>
        <div
          data-plasmic-name={"title"}
          data-plasmic-override={overrides.title}
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.title
          )}
        >
          {"SHIELD Staking"}
        </div>
      </div>

      <p.Stack
        as={"div"}
        hasGap={true}
        className={classNames(projectcss.all, sty.freeBox__fXij1, {
          [sty.freeBoxapprove__fXij1IKL]: hasVariant(
            variants,
            "approve",
            "approve"
          )
        })}
      >
        {(hasVariant(variants, "approve", "approve") ? true : true) ? (
          <TextInput
            data-plasmic-name={"amountInput"}
            data-plasmic-override={overrides.amountInput}
            className={classNames("__wab_instance", sty.amountInput, {
              [sty.amountInputapprove]: hasVariant(
                variants,
                "approve",
                "approve"
              )
            })}
            placeholder={"Amount"}
          />
        ) : null}
      </p.Stack>

      <div className={classNames(projectcss.all, sty.freeBox__geWsv)}>
        <Button
          data-plasmic-name={"approveButton"}
          data-plasmic-override={overrides.approveButton}
          className={classNames("__wab_instance", sty.approveButton, {
            [sty.approveButtonapprove]: hasVariant(
              variants,
              "approve",
              "approve"
            )
          })}
          color={"primary"}
          round={true}
        >
          {hasVariant(variants, "approve", "approve") ? "APPROVE" : "STAKE"}
        </Button>
      </div>
    </div>
  );
}

const PlasmicDescendants = {
  root: ["root", "title", "amountInput", "approveButton"],
  title: ["title"],
  amountInput: ["amountInput"],
  approveButton: ["approveButton"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicStakeCard__ArgProps,
      internalVariantPropNames: PlasmicStakeCard__VariantProps
    });

    return PlasmicStakeCard__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicStakeCard";
  } else {
    func.displayName = `PlasmicStakeCard.${nodeName}`;
  }
  return func;
}

export const PlasmicStakeCard = Object.assign(
  // Top-level PlasmicStakeCard renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    title: makeNodeComponent("title"),
    amountInput: makeNodeComponent("amountInput"),
    approveButton: makeNodeComponent("approveButton"),
    // Metadata about props expected for PlasmicStakeCard
    internalVariantProps: PlasmicStakeCard__VariantProps,
    internalArgProps: PlasmicStakeCard__ArgProps
  }
);

export default PlasmicStakeCard;
/* prettier-ignore-end */
