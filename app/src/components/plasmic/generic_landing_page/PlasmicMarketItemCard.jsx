// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 32A6R5tEk8Q2nVvJmPnVbf
// Component: hvcsRsK1439m
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  hasVariant,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import Avatar from "../../Avatar"; // plasmic-import: 0FX33L-MQH/component
import ShieldLabel from "../../ShieldLabel"; // plasmic-import: VTcoPS-NzQ/component
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_generic_landing_page.module.css"; // plasmic-import: 32A6R5tEk8Q2nVvJmPnVbf/projectcss
import sty from "./PlasmicMarketItemCard.module.css"; // plasmic-import: hvcsRsK1439m/css
import HamburgerIcon from "./icons/PlasmicIcon__Hamburger"; // plasmic-import: 6d9hcyD0CNCRL/icon
import sunglassesMaleXXZ2KgDyeVng from "./images/sunglassesMale.jpeg"; // plasmic-import: x_xZ2kgDYEVng/picture

export const PlasmicMarketItemCard__VariantProps = new Array("profile", "type");

export const PlasmicMarketItemCard__ArgProps = new Array(
  "children",
  "titleText"
);

function PlasmicMarketItemCard__RenderFunc(props) {
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
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        sty.root
      )}
    >
      <p.Stack
        as={"div"}
        hasGap={true}
        className={classNames(projectcss.all, sty.freeBox__auel2, {
          [sty.freeBoxprofile__auel2WvqJp]: hasVariant(
            variants,
            "profile",
            "profile"
          ),

          [sty.freeBoxtype__static__auel2Zqfqj]: hasVariant(
            variants,
            "type",
            "_static"
          ),

          [sty.freeBoxtype_dynamic__auel26K8Co]: hasVariant(
            variants,
            "type",
            "dynamic"
          ),

          [sty.freeBoxtype_onSale__auel2Sa2Du]: hasVariant(
            variants,
            "type",
            "onSale"
          )
        })}
      >
        <div
          className={classNames(projectcss.all, sty.freeBox__zpdxS, {
            [sty.freeBoxprofile__zpdxSWvqJp]: hasVariant(
              variants,
              "profile",
              "profile"
            ),

            [sty.freeBoxtype__static__zpdxSzqfqj]: hasVariant(
              variants,
              "type",
              "_static"
            ),

            [sty.freeBoxtype_dynamic__zpdxS6K8Co]: hasVariant(
              variants,
              "type",
              "dynamic"
            ),

            [sty.freeBoxtype_onSale__zpdxSsa2Du]: hasVariant(
              variants,
              "type",
              "onSale"
            )
          })}
        >
          {(
            hasVariant(variants, "type", "onSale")
              ? true
              : hasVariant(variants, "type", "_static")
              ? true
              : hasVariant(variants, "type", "dynamic")
              ? true
              : hasVariant(variants, "profile", "profile")
              ? true
              : true
          ) ? (
            <Avatar
              data-plasmic-name={"avatar"}
              data-plasmic-override={overrides.avatar}
              className={classNames("__wab_instance", sty.avatar, {
                [sty.avatarprofile]: hasVariant(variants, "profile", "profile"),
                [sty.avatartype__static]: hasVariant(
                  variants,
                  "type",
                  "_static"
                ),

                [sty.avatartype_dynamic]: hasVariant(
                  variants,
                  "type",
                  "dynamic"
                ),

                [sty.avatartype_onSale]: hasVariant(variants, "type", "onSale")
              })}
            />
          ) : null}
        </div>
      </p.Stack>

      {(
        hasVariant(variants, "type", "onSale")
          ? true
          : hasVariant(variants, "type", "_static")
          ? true
          : hasVariant(variants, "type", "dynamic")
          ? true
          : hasVariant(variants, "profile", "profile")
          ? true
          : true
      ) ? (
        <HamburgerIcon
          data-plasmic-name={"svg"}
          data-plasmic-override={overrides.svg}
          className={classNames(projectcss.all, sty.svg, {
            [sty.svgprofile]: hasVariant(variants, "profile", "profile"),
            [sty.svgtype__static]: hasVariant(variants, "type", "_static"),
            [sty.svgtype_dynamic]: hasVariant(variants, "type", "dynamic"),
            [sty.svgtype_onSale]: hasVariant(variants, "type", "onSale")
          })}
          role={"img"}
        />
      ) : null}

      <div
        className={classNames(projectcss.all, sty.freeBox__wpKcT, {
          [sty.freeBoxprofile__wpKcTWvqJp]: hasVariant(
            variants,
            "profile",
            "profile"
          ),

          [sty.freeBoxtype__static__wpKcTzqfqj]: hasVariant(
            variants,
            "type",
            "_static"
          ),

          [sty.freeBoxtype_dynamic__wpKcT6K8Co]: hasVariant(
            variants,
            "type",
            "dynamic"
          ),

          [sty.freeBoxtype_onSale__wpKcTsa2Du]: hasVariant(
            variants,
            "type",
            "onSale"
          )
        })}
      >
        <div
          data-plasmic-name={"title"}
          data-plasmic-override={overrides.title}
          className={classNames(projectcss.all, sty.title, {
            [sty.titleprofile]: hasVariant(variants, "profile", "profile"),
            [sty.titletype__static]: hasVariant(variants, "type", "_static"),
            [sty.titletype_dynamic]: hasVariant(variants, "type", "dynamic"),
            [sty.titletype_onSale]: hasVariant(variants, "type", "onSale")
          })}
        >
          <div
            className={classNames(projectcss.all, sty.freeBox__jo1Sv, {
              [sty.freeBoxprofile__jo1SvWvqJp]: hasVariant(
                variants,
                "profile",
                "profile"
              ),

              [sty.freeBoxtype__static__jo1Svzqfqj]: hasVariant(
                variants,
                "type",
                "_static"
              ),

              [sty.freeBoxtype_dynamic__jo1Sv6K8Co]: hasVariant(
                variants,
                "type",
                "dynamic"
              ),

              [sty.freeBoxtype_onSale__jo1Svsa2Du]: hasVariant(
                variants,
                "type",
                "onSale"
              )
            })}
          >
            {p.renderPlasmicSlot({
              defaultContents: "Cool NFT title",
              value: args.titleText,
              className: classNames(sty.slotTargetTitleText, {
                [sty.slotTargetTitleTextprofile]: hasVariant(
                  variants,
                  "profile",
                  "profile"
                ),

                [sty.slotTargetTitleTexttype__static]: hasVariant(
                  variants,
                  "type",
                  "_static"
                ),

                [sty.slotTargetTitleTexttype_dynamic]: hasVariant(
                  variants,
                  "type",
                  "dynamic"
                ),

                [sty.slotTargetTitleTexttype_onSale]: hasVariant(
                  variants,
                  "type",
                  "onSale"
                )
              })
            })}
          </div>
        </div>

        <ShieldLabel
          data-plasmic-name={"shieldLabel"}
          data-plasmic-override={overrides.shieldLabel}
          className={classNames("__wab_instance", sty.shieldLabel)}
        />
      </div>

      <p.Stack
        as={"div"}
        hasGap={true}
        className={classNames(projectcss.all, sty.freeBox__rdnr8)}
      >
        <p.PlasmicImg
          data-plasmic-name={"image"}
          data-plasmic-override={overrides.image}
          alt={""}
          className={classNames(sty.image)}
          displayHeight={"100%"}
          displayMaxHeight={"none"}
          displayMaxWidth={"100%"}
          displayMinHeight={"0"}
          displayMinWidth={"0"}
          displayWidth={"100%"}
          loading={"lazy"}
          src={{
            src: sunglassesMaleXXZ2KgDyeVng,
            fullWidth: 2851,
            fullHeight: 1900,
            aspectRatio: undefined
          }}
        />
      </p.Stack>

      <div
        className={classNames(projectcss.all, sty.freeBox__fgpKw, {
          [sty.freeBoxprofile__fgpKwWvqJp]: hasVariant(
            variants,
            "profile",
            "profile"
          ),

          [sty.freeBoxtype__static__fgpKWzqfqj]: hasVariant(
            variants,
            "type",
            "_static"
          ),

          [sty.freeBoxtype_dynamic__fgpKw6K8Co]: hasVariant(
            variants,
            "type",
            "dynamic"
          ),

          [sty.freeBoxtype_onSale__fgpKWsa2Du]: hasVariant(
            variants,
            "type",
            "onSale"
          )
        })}
      >
        {(hasVariant(variants, "type", "_static") ? true : true) ? (
          <button
            data-plasmic-name={"removeButton"}
            data-plasmic-override={overrides.removeButton}
            aria-label={""}
            className={classNames(
              projectcss.all,
              projectcss.button,
              sty.removeButton,
              {
                [sty.removeButtonprofile]: hasVariant(
                  variants,
                  "profile",
                  "profile"
                ),

                [sty.removeButtontype__static]: hasVariant(
                  variants,
                  "type",
                  "_static"
                ),

                [sty.removeButtontype_dynamic]: hasVariant(
                  variants,
                  "type",
                  "dynamic"
                ),

                [sty.removeButtontype_onSale]: hasVariant(
                  variants,
                  "type",
                  "onSale"
                )
              }
            )}
            disabled={false}
            id={""}
            role={""}
          >
            <div
              className={classNames(projectcss.all, sty.freeBox__rylO3, {
                [sty.freeBoxprofile__rylO3WvqJp]: hasVariant(
                  variants,
                  "profile",
                  "profile"
                ),

                [sty.freeBoxtype__static__rylO3Zqfqj]: hasVariant(
                  variants,
                  "type",
                  "_static"
                ),

                [sty.freeBoxtype_dynamic__rylO36K8Co]: hasVariant(
                  variants,
                  "type",
                  "dynamic"
                ),

                [sty.freeBoxtype_onSale__rylO3Sa2Du]: hasVariant(
                  variants,
                  "type",
                  "onSale"
                )
              })}
            >
              {p.renderPlasmicSlot({
                defaultContents: "Add SHIELD Power",
                value: args.children,
                className: classNames(sty.slotTargetChildren, {
                  [sty.slotTargetChildrenprofile]: hasVariant(
                    variants,
                    "profile",
                    "profile"
                  ),

                  [sty.slotTargetChildrentype__static]: hasVariant(
                    variants,
                    "type",
                    "_static"
                  ),

                  [sty.slotTargetChildrentype_dynamic]: hasVariant(
                    variants,
                    "type",
                    "dynamic"
                  ),

                  [sty.slotTargetChildrentype_onSale]: hasVariant(
                    variants,
                    "type",
                    "onSale"
                  )
                })
              })}
            </div>
          </button>
        ) : null}
        {(
          hasVariant(variants, "type", "onSale")
            ? true
            : hasVariant(variants, "type", "_static")
            ? true
            : hasVariant(variants, "type", "dynamic")
            ? true
            : hasVariant(variants, "profile", "profile")
            ? true
            : false
        ) ? (
          <button
            data-plasmic-name={"sellButton"}
            data-plasmic-override={overrides.sellButton}
            className={classNames(
              projectcss.all,
              projectcss.button,
              projectcss.__wab_text,
              sty.sellButton,
              {
                [sty.sellButtonprofile]: hasVariant(
                  variants,
                  "profile",
                  "profile"
                ),

                [sty.sellButtontype__static]: hasVariant(
                  variants,
                  "type",
                  "_static"
                ),

                [sty.sellButtontype_dynamic]: hasVariant(
                  variants,
                  "type",
                  "dynamic"
                ),

                [sty.sellButtontype_onSale]: hasVariant(
                  variants,
                  "type",
                  "onSale"
                )
              }
            )}
          >
            {hasVariant(variants, "type", "onSale")
              ? "SELL"
              : hasVariant(variants, "type", "_static")
              ? "SELL"
              : hasVariant(variants, "type", "dynamic")
              ? "SELL"
              : hasVariant(variants, "profile", "profile")
              ? "SELL"
              : "Buy now: 500000 SHIELD"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

const PlasmicDescendants = {
  root: [
    "root",
    "avatar",
    "svg",
    "title",
    "shieldLabel",
    "image",
    "removeButton",
    "sellButton"
  ],

  avatar: ["avatar"],
  svg: ["svg"],
  title: ["title"],
  shieldLabel: ["shieldLabel"],
  image: ["image"],
  removeButton: ["removeButton"],
  sellButton: ["sellButton"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicMarketItemCard__ArgProps,
      internalVariantPropNames: PlasmicMarketItemCard__VariantProps
    });

    return PlasmicMarketItemCard__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicMarketItemCard";
  } else {
    func.displayName = `PlasmicMarketItemCard.${nodeName}`;
  }
  return func;
}

export const PlasmicMarketItemCard = Object.assign(
  // Top-level PlasmicMarketItemCard renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    avatar: makeNodeComponent("avatar"),
    svg: makeNodeComponent("svg"),
    title: makeNodeComponent("title"),
    shieldLabel: makeNodeComponent("shieldLabel"),
    image: makeNodeComponent("image"),
    removeButton: makeNodeComponent("removeButton"),
    sellButton: makeNodeComponent("sellButton"),
    // Metadata about props expected for PlasmicMarketItemCard
    internalVariantProps: PlasmicMarketItemCard__VariantProps,
    internalArgProps: PlasmicMarketItemCard__ArgProps
  }
);

export default PlasmicMarketItemCard;
/* prettier-ignore-end */
