import * as React from "react";
import { PlasmicNftMintWidget } from "./plasmic/shield_ecosystem_app/PlasmicNftMintWidget";
import { DrizzleContext } from "@drizzle/react-plugin";
import Compressor from "compressorjs";

// !TODO: THIS KEY IS ONLY FOR TESTING PURPOSES. REMOVE ON PRODUCTION AND USE A BACKEND SERVICE INSTEAD.
const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRGN2I2ZTc4ZDYxNzY5ODg3MDBjMzRhRTg5QjY1OTJFMjBmQkZEYTMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0ODcxMDcwODg3NCwibmFtZSI6IlNoaWVsZERldmVsb3BtZW50In0.EgUZmkxX-YF3mQRaA4IMPVhhtCT93O1sEGr_5y7Ut9A";
function NftMintWidget_(props, ref) {
  const { onSubmit, setLoading, ...rest } = props;
  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState();

  const drizzleContext = React.useContext(DrizzleContext.Context);
  const drizzle = drizzleContext.drizzle;
  const nftContract = drizzle.contracts.ShieldNFT;

  return (
    <PlasmicNftMintWidget
      titleInput={{
        onChange: (e) => {
          setTitle(e.target.value);
        },
      }}
      image={{
        ...(image && { src: image }),
      }}
      imageInput={{
        render: (props) => {
          return (
            <input
              type="file"
              accept="image/*"
              style={{ marginLeft: 145 }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  new Compressor(file, {
                    quality: 0.7,
                    success: (compressedResult) => {
                      const reader = new FileReader();
                      reader.onload = (image) => {
                        setImage(image.target.result);
                      };
                      reader.readAsDataURL(compressedResult);
                    },
                  });
                }
              }}
            />
          );
        },
      }}
      mintButton={{
        isDisabled: title == "" || !image,
        onClick: async (event) => {
          setLoading(true);
          const nft = {
            image: image,
            name: title,
            properties: {
              version: "0.0",
            },
          };
          const formData = new FormData();
          formData.append("meta", JSON.stringify(nft));
          const requestOptions = {
            method: "POST",
            headers: { Authorization: `Bearer ${NFT_STORAGE_KEY}` },
            body: formData,
          };
          fetch("https://api.nft.storage/store", requestOptions)
            .then((response) => response.json())
            .then(async (data) => {
              if (data.ok) {
                try {
                  await nftContract.methods["shieldMint"](
                    data.value.url
                  ).send();
                } catch (error) {}
              }
              setLoading(false);
            });
          onSubmit();
        },
      }}
      root={{
        onClick: (event) => {
          event.stopPropagation();
        },
      }}
      {...rest}
    />
  );
}

const NftMintWidget = React.forwardRef(NftMintWidget_);

export default React.memo(NftMintWidget);
