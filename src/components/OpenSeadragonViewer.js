// // import OpenSeadragon from "openseadragon";
// import React, { useEffect, useState } from "react";
// import { Col } from "react-bootstrap";
// import "../assets/styles/styles.scss";

// // const OpenSeadragon  = null;
// // if (typeof window !== `undefined`) {
// //    OpenSeadragon = require("openseadragon");
// // }
// /**
//  * 
//  * @param {*} imageId the id of the image which to be rendered in the OpenSeadragon 
//  * @returns a @Col 
//  */
// export const OpenSeadragonViewer = ({ imageId }) => {
//   const [viewer, setViewer] = useState(null);

//   //Getting the id ready to feed to viewer
//   const baseURl = "https://digitalcollections.tricolib.brynmawr.edu/iiif/2/";
//   const postFix = "~JP2~/info.json";
//   let idWithColon = imageId.slice(0, 2) + ":" + imageId.slice(2);
//   console.log(idWithColon);
//   let image = baseURl + idWithColon + postFix;
//   console.log(image);

//   useEffect(() => {
//     if (image && viewer) {
//       viewer.open(image);
//     }
//   }, [image]);

//   //Initialize the viewer
// useEffect(() => {
//     const InitOpenSeadragon = () => {
//       viewer && viewer.destroy();
//       setViewer(
//         OpenSeadragon({
//           id: "openseadragon",
//           prefixUrl: "openseadragon/images/",
//           preserveViewport: true,
//           visibilityRatio: 1,
//           minZoomLevel: 1,
//           defaultZoomLevel: 1,
//           sequenceMode: false,
//           tileSources: [image],
//         })
//       );
//     };
 
//     InitOpenSeadragon();
//     return () => {
//       viewer && viewer.destroy();
//     };

// },[])


//   return <Col id="openseadragon"></Col>;
// };

import React from 'react'

const OpenSeadragonViewer = () => {
  return (
    <div>
      <h1>None</h1>
    </div>
  )
}

export default OpenSeadragonViewer;
