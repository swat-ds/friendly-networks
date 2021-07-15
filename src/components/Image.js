import React from "react";
import { useState } from "react";
import styled from "styled-components";
import {Button, Col, Row} from "react-bootstrap";


const allSC = [
"sc203238",
"sc203247",
"sc203248",
"sc203249",
"sc203250",
"sc203251",
"sc203252",
"sc203253"];
let counter = 0;
let baseURl =
  "https://digitalcollections.tricolib.brynmawr.edu/cantaloupe/iiif/2/";
let postFix = "~JP2~/full/max/0/default.jpg";


// function prevURL() {
//   // let pid = "sc203248";
//   counter--;
//   let pid = allSC[counter];
//   let pidReady = pid.slice(0, 2) + ":" + pid.slice(2);
//   let src = baseURl + pidReady + postFix;
//   return src;
// }
const Image = (props) => {
  function nextURL() {
    // let pid = props.pid;
    // var pidReady = pid.slice(0, 2) + ":" + pid.slice(2);
    // var src = baseURl + pidReady + postFix;
    // return src;
    return null
  }
  let initialSrc = nextURL();
  const [displayedImage, setImage] = useState(initialSrc);
  return (
      <Col>
        <img src={displayedImage} id="image" style={{ "height": "6in",
    "width": "5in"}}/>
      </Col>
    
  );
};

export default Image;


