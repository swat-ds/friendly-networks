import OpenSeadragon from "openseadragon";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import "../assets/styles/styles.scss";

export const OpenSeadragonViewer = ({ imageId }) => {
  const [viewer, setViewer] = useState(null);

  const baseURl = "https://digitalcollections.tricolib.brynmawr.edu/iiif/2/";
  //https://digitalcollections.tricolib.brynmawr.edu/iiif/2/sc:203289~JP2~/info.json
  const postFix = "~JP2~/info.json";
  let idWithColon = imageId.slice(0, 2) + ":" + imageId.slice(2);
  console.log(idWithColon);
  let image = baseURl + idWithColon + postFix;
  console.log(image);

  useEffect(() => {
    if (image && viewer) {
      viewer.open(image);
    }
  }, [image]);

  const InitOpenSeadragon = () => {
    viewer && viewer.destroy();
    setViewer(
      OpenSeadragon({
        id: "openseadragon",
        prefixUrl: "openseadragon/images/",
        preserveViewport: true,
        visibilityRatio: 1,
        minZoomLevel: 1,
        defaultZoomLevel: 1,
        sequenceMode: false,
        tileSources: [image],
      })
    );
  };

  useEffect(() => {
    InitOpenSeadragon();
    return () => {
      viewer && viewer.destroy();
    };
  }, []);

  return <Col id="openseadragon"></Col>;
};
