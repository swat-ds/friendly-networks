// import React from "react";
// import OpenSeadragon from 'openseadragon';
// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import { Button, Col, Row } from "react-bootstrap";

// let baseURl =
//   "https://digitalcollections.tricolib.brynmawr.edu/cantaloupe/iiif/2/";
// let postFix = "~JP2~/full/max/0/default.jpg";

// // function prevURL() {
// //   // let pid = "sc203248";
// //   counter--;
// //   let pid = allSC[counter];
// //   let pidReady = pid.slice(0, 2) + ":" + pid.slice(2);
// //   let src = baseURl + pidReady + postFix;
// //   return src;
// // }
// const Image = ({ imageId }) => {
//   let imageInfo =
//     baseURl + imageId.slice(0, 2) + ":" + imageId.slice(2) + postFix;

//   const [viewer, setViewer] = useState(null);

//   useEffect(() => {
//     if (imageId && viewer) {
//       viewer.open(imageId);
//     }
//   }, [imageId]);

//   const InitOpenSeadragon = () => {
//     viewer && viewer.destroy();
//     setViewer(
//       OpenSeadragon({
//         id: "openseadragon",
//         prefixUrl: "openseadragon/images/",
//         preserveViewport: true,
//         visibilityRatio: 1,
//         minZoomLevel: 1,
//         defaultZoomLevel: 1,
//         sequenceMode: false,
//         tileSources: [imageInfo],
//       })
//     );
//   };

//   useEffect(() => {
//     InitOpenSeadragon();
//     return () => {
//       viewer && viewer.destroy();
//     };
//   }, []);

//   return (
//     <div
//       id="openseadragon"
//       style={{
//         height: "800px",
//         width: "600px",
//       }}
//     ></div>
//   );
// };

// export default Image;
