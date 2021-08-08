
import React, { useEffect, useState } from "react";
import { Col, Image } from "react-bootstrap";
import "../assets/styles/styles.scss";
// import "../assets/styles/image.scss"


/**
 *
 * @param {*} imageId the id of the image which to be rendered in the OpenSeadragon
 * @returns a @Col
 */
const JournalImage = ({ imageId, id }) => {

  //Getting the id ready to feed to viewer
  const baseURl = "https://digitalcollections.tricolib.brynmawr.edu/iiif/2/";
  const postFix = "~JP2~470f51915ee42083c974f3d5a02%5B%E2%80%A6%5Dcc9da0bb20ff9f541d82a/full/pct:100/0/default.jpg";
  let idWithColon = imageId.slice(0, 2) + ":" + imageId.slice(2);
  let image = baseURl + idWithColon + postFix;
  

  //Initialize the viewer


  return <Image id={id} src={image} alt="journal image" fluid></Image>;
};

export default JournalImage;