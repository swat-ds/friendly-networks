import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import "../assets/styles/styles.scss";
import { Container, Row, Button, Col } from "react-bootstrap";
// import  OpenSeadragonViewer  from "./OpenSeadragonViewer";
import Layout from "./Layout";
import Image from "./Image";

import { scroller } from "react-scroll";

const parseString = require("xml2js").parseString;

  function getDivBreaks(divList) {
    let divBreaks = []
    divList.forEach((div) => {
      if ("tei-pb" in div) {
        div["tei-pb"].forEach((pb) => divBreaks.push(pb.$.facs));
      }
    });
    return divBreaks;
  }

function getALlPageBreaks(jsonPrefixed){
  let pageBreakIDs = []; 
  if ("tei-front" in jsonPrefixed["tei-TEI"]["tei-text"][0]) {
    let front = jsonPrefixed["tei-TEI"]["tei-text"][0]["tei-front"][0];

    front["teit-pb"].forEach((pb) => {
      pageBreakIDs.push(pb?.$?.facs);
    });
    if ("tei-div" in front) {
      pageBreakIDs.push(...getDivBreaks(front["tei-div"]));
    }
  }

  //Get the ones that are body's children
  if ("tei-body" in jsonPrefixed["tei-TEI"]["tei-text"][0]) {
    let body = jsonPrefixed["tei-TEI"]["tei-text"][0]["tei-body"][0];
    //   for (const pid of jsonPrefixed.TEI?.text[0]?.body[0]?.pb) {
    //     pageBreakIDs.push(pid.$.facs);
    //   }
    body["tei-pb"].forEach((pb) => {
      pageBreakIDs.push(pb?.$?.facs);
    });

    if ("tei-div" in body) {
      pageBreakIDs.push(...getDivBreaks(body["tei-div"]));
    }
  }

  if ("tei-back" in jsonPrefixed["tei-TEI"]["tei-text"][0]) {
    let back = jsonPrefixed["tei-TEI"]["tei-text"][0]["tei-back"][0];
    back["teit-pb"].forEach((pb) => {
      pageBreakIDs.push(pb?.$?.facs);
    });
    if ("tei-div" in back) {
      pageBreakIDs.push(...getDivBreaks(back["tei-div"]));
    }
  }
  return pageBreakIDs;

}

let counter = 1; // counter for to tract the index of each transcript (cetei)
let currentInput = 0; // variable for the input value for the scroll

/**
 * An all-encompassing component for the journal display; the image and the transcript
 * @param {*} props the properties to be passed when used this component
 * @returns a component, containing the OpenSeaDragon and transcript, for each journal
 */
const Volume = (props) => {
  const { pageContext, data } = props;
  // console.log(pageContext.prefixed);
  let pids = [];
  let pageBreakIDs = [];

    let jsonPrefixed;
    parseString(pageContext.prefixed, function (err, result) {
      jsonPrefixed = result;
    });
  
    console.log(typeof jsonPrefixed);
    console.log(jsonPrefixed);
    console.log(jsonPrefixed.hasOwnProperty("tei-TEI"));
    pageBreakIDs = getALlPageBreaks(jsonPrefixed);

  // function getDivBreaks(divList) {
  //   divList.forEach((div) => {
  //     if ("tei-pb" in div) {
  //       div["tei-pb"].forEach((pb) => pageBreakIDs.push(pb.$.facs));
  //     }
  //   });
  // }
  // if ("tei-front" in jsonPrefixed["tei-TEI"]["tei-text"][0]) {
  //     let front = jsonPrefixed["tei-TEI"]["tei-text"][0]["tei-front"][0]

  //       front["teit-pb"].forEach((pb) => {
  //           pageBreakIDs.push(pb?.$?.facs);
  //         });
  //     if("tei-div" in front){
  //         getDivBreaks(front["tei-div"])
  //     }
  // }

  // //Get the ones that are body's children
  // if ("tei-body" in jsonPrefixed["tei-TEI"]["tei-text"][0]) {
  //   let body = jsonPrefixed["tei-TEI"]["tei-text"][0]["tei-body"][0];
  //   //   for (const pid of jsonPrefixed.TEI?.text[0]?.body[0]?.pb) {
  //   //     pageBreakIDs.push(pid.$.facs);
  //   //   }
  //   body["tei-pb"].forEach((pb) => {
  //     pageBreakIDs.push(pb?.$?.facs);
  //   });

  //   if ("tei-div" in body) {
  //     getDivBreaks(body["tei-div"]);
  //   }
  // }

 

  // if ("tei-back" in jsonPrefixed["tei-TEI"]["tei-text"][0]) {
  //   let back = jsonPrefixed["tei-TEI"]["tei-text"][0]["tei-back"][0];
  //  back["teit-pb"].forEach((pb) => {
  //    pageBreakIDs.push(pb?.$?.facs);
  //  });
  //   if ("tei-div" in back) {
  //     getDivBreaks(back["tei-div"]);
  //   }
  // }

   console.log(pageBreakIDs);

   pids = pageBreakIDs;
  // const parser = new DOMParser();
  // const xmlDoc = parser.parseFromString(pageContext.prefixed, "text/xml");
  // const pages = xmlDoc.getElementsByTagName("tei-pb");

  // for (let index = 0; index < pages.length; index++) {
  //   pids.push(pages[index].attributes.getNamedItem("facs").value);
  // }

  const [cetei, setCetei] = useState(data.allCetei.nodes[counter].parent.name);

  /**
   * Handle the change when a new value is entered on the input
   * @param {*} e the event
   */
  function onChange(e) {
    currentInput = e.target.value;
    e.preventDefault();
  }
  //State to set pid (constellation id)
  const [currentPid, setPid] = useState(pids[currentInput]);

  //Sets the current cetei with the next cetei
  function getNextCetei() {
    setCetei(data.allCetei.nodes[counter++].parent.name);
  }

  //Sets the current cetei to the previous cetei
  function getPrevCetei() {
    setCetei(data.allCetei.nodes[counter--].parent.name);
  }

  /**
   * Implements the scroll functionality for th transcript
   * @param {*} page the page to be scrolled to
   */
  function scroll(page) {
    scroller.scrollTo(page, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      containerId: "journal",
    });
  }

  /**
   * Find and get the index of the next pid relative to th @currentPid
   * Scroll to the page corresponding to this next pud and set that pid to be the @currentPid
   */


  function getNextImage() {
    let i = pids.indexOf(currentPid) + 1;
    if(i >= 0 && i <= pids.length-1){
      scroll(pids[i]);
      setPid(pids[i]);
    }
  }

  /**
   * Find and get the index of the previous pid relative to th @currentPid
   * Scroll to the page corresponding to this previous pud and set that pid to be the @currentPid
   */
  function getPrevImage() {
    let i = pids.indexOf(currentPid) - 1;
     if (i >= 0 && i <= pids.length-1) {
       scroll(pids[i]);
       setPid(pids[i]);
     }
  }

  // function conditionalCallBack(callback){

  // }
  // A wrapper function for the scroll()
  function handleClick() {
    scroll(currentPid);
  }

  return (
    <Layout>
      <Row>
        <Col>
          <Button
            variant="outline-info"
            onClick={() => getPrevImage()}
          >
            Previous Page
          </Button>
        </Col>

        <Col sm={8}>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={onChange}
              placeholder={""}
            />
            <button
              class="btn btn-outline-success"
              type="submit"
              onClick={() => handleClick()}
            >
              Search
            </button>
          </form>
        </Col>
        <Col md={{ offset: 7 }}>
          <Button
            variant="outline-info"
            onClick={() => getNextImage()}
          >
            Next Page
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image imageId={currentPid} />
        </Col>
        <Col>
          <div id="journal">{props.children}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="outline-info" onClick={() => getPrevCetei()}>
            <Link to={"/" + cetei}>Previous Journal</Link>
          </Button>
        </Col>
        <Col md={{ offset: 7 }}>
          <Button variant="outline-info" onClick={() => getNextCetei()}>
            <Link to={"/" + cetei}>Next Journal</Link>
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default Volume;
