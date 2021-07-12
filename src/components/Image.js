import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button"

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
let baseURl = "https://digitalcollections.tricolib.brynmawr.edu/iiif/2/";
let postFix =
  "~JP2~470f51915ee42083c974f3d5a02%5B%E2%80%A6%5Dcc9da0bb20ff9f541d82a/full/pct:100/1/default.jpg";

function nextURL() {
  // let pid = "sc203248";
  var pid = allSC[counter];
  console.log(counter, pid);
  counter++;
  var pidReady = pid.slice(0, 2) + ":" + pid.slice(2);
  var src = baseURl + pidReady + postFix;
  return src;
}

// function prevURL() {
//   // let pid = "sc203248";
//   counter--;
//   let pid = allSC[counter];
//   let pidReady = pid.slice(0, 2) + ":" + pid.slice(2);
//   let src = baseURl + pidReady + postFix;
//   return src;
// }
let initialSrc = nextURL();
const Image = () => {
  const [displayedImage, setImage] = useState(initialSrc);
  return (
    <Wrapper>
      {/* <button onClick={setImage(prevURL())}>prev</button> */}
      <img src={displayedImage} id="image"/>
      <button onClick={() => setImage(nextURL())}>next </button>
    </Wrapper>
  );
};

export default Image;

const Wrapper = styled.div`
width: 6in;
border: 2px solid red;
align-items: center;
display: flex;
  img {
    height: 6in;
    width: 5in;
  }
`;
