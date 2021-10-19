import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import "../assets/styles/volume.scss";
import { IconContext } from "react-icons";
import { BsArrowRight, BsArrowLeft, BsTriangleFill } from "react-icons/bs";
import { Container, Row, Button, Col, Collapse } from "react-bootstrap";
// import  OpenSeadragonViewer  from "./OpenSeadragonViewer";
import Layout from "./Layout";
import JournalImage from "./JournalImage";
import Viewer from "./Viewer";

import { scroller } from "react-scroll";

const parseString = require("xml2js").parseString;

function getDivBreaks(divList) {
  let divBreaks = [];
  divList.forEach((div) => {
    if ("tei-pb" in div) {
      div["tei-pb"].forEach((pb) => divBreaks.push(pb.$.facs));
    }
  });
  return divBreaks;
}

function getALlPageBreaks(jsonPrefixed) {
  let pageBreakIDs = [];
  if ("tei-front" in jsonPrefixed["tei-TEI"]["tei-text"][0]) {
    let front = jsonPrefixed["tei-TEI"]["tei-text"][0]["tei-front"][0];
    if ("tei-pb" in front) {
      front["tei-pb"].forEach((pb) => {
        pageBreakIDs.push(pb?.$?.facs);
      });
    }
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
    if ("tei-pb" in body) {
      body["tei-pb"].forEach((pb) => {
        pageBreakIDs.push(pb?.$?.facs);
      });
    }

    if ("tei-div" in body) {
      pageBreakIDs.push(...getDivBreaks(body["tei-div"]));
    }
  }

  if ("tei-back" in jsonPrefixed["tei-TEI"]["tei-text"][0]) {
    let back = jsonPrefixed["tei-TEI"]["tei-text"][0]["tei-back"][0];

    if ("tei-pb" in back) {
      back["tei-pb"].forEach((pb) => {
        pageBreakIDs.push(pb?.$?.facs);
      });
    }
    if ("tei-div" in back) {
      pageBreakIDs.push(...getDivBreaks(back["tei-div"]));
    }
  }
  return pageBreakIDs;
}

let counter = 0; // counter for to tract the index of each transcript (cetei)

/**
 * An all-encompassing component for the journal display; the image and the transcript
 * @param {*} props the properties to be passed when used this component
 * @returns a component, containing the OpenSeaDragon and transcript, for each journal
 */
let counter2 = 0;

const Volume = (props) => {
  const { pageContext, data, hash } = props;
  // console.log(pageContext.prefixed);
  let pids = [];
  let pageBreakIDs = [];

  let jsonPrefixed;
  parseString(pageContext.prefixed, function (err, result) {
    jsonPrefixed = result;
  });

  pageBreakIDs = getALlPageBreaks(jsonPrefixed);

  pids = pageBreakIDs;

  // counter = name_index.has(pageContext.name)? name_index.get(pageContext.name) : 0;
  const [cetei, setCetei] = useState(data.allCetei.nodes[counter].parent.name);
  const ref = useRef();

  /**
   * Handle the change when a new value is entered on the input
   * @param {*} e the event
   */

  //State to set pid (constellation id)
  const [currentPid, setPid] = useState(pids[counter2]);

  //Sets the current cetei with the next cetei
  function getNextCetei() {
    counter += 1;
    setCetei(data.allCetei.nodes[counter].parent.name);
    console.log(counter);
    console.log(data.allCetei.nodes[counter].parent.name);
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
      containerId: "journal-transcript",
    });
  }

  /**
   * Possible patterns:
   * 1. http://localhost:8000/sc203246?/#pid=sc203683
   * 2. http://localhost:8000/sc203246/#pid=sc203683
   * Nothing needs to be changed for the scrolling whatsoever, both works.
   */
  if (hash != "") {
    let hashPid = hash.substring(5); // => #pid=sc203683 becomes sc203683
    scroll(hashPid);
  }

  /**
   * Find and get the index of the next pid relative to th @currentPid
   * Scroll to the page corresponding to this next pud and set that pid to be the @currentPid
   */

  function getNextImage() {
    console.log(currentPid);
    let i = pids.indexOf(currentPid) + 1;
    if (i >= 0 && i <= pids.length - 1) {
      scroll(pids[i]);
      setPid(pids[i]);
    }
  }
  console.log(currentPid);
  console.log(ref);

  /**
   * Find and get the index of the previous pid relative to th @currentPid
   * Scroll to the page corresponding to this previous pud and set that pid to be the @currentPid
   */
  function getPrevImage() {
    console.log(currentPid);
    let i = pids.indexOf(currentPid) - 1;
    if (i >= 0 && i <= pids.length - 1) {
      scroll(pids[i]);
      setPid(pids[i]);
    }
    console.log(currentPid);
  }

  // function useOnScreen(element) {
  //   const [isIntersecting, setIntersecting] = useState(false);

  //   const observer = new IntersectionObserver(([entry]) =>
  //     setIntersecting(entry.isIntersecting)
  //   );
  //   useEffect(() => {
  //     observer.observe(ref.current);
  //     // Remove the observer as soon as the component is unmounted
  //     return () => {
  //       observer.disconnect();
  //     };
  //   }, []);

  //   return isIntersecting;
  // }

   const [scrollNumber, setScrollNumber] = useState(0);

   useEffect(() => {
     if (window !== undefined && document !== undefined) {
       let callback = (entries, observer) => {
         // console.log(pids.length);
         entries.forEach((entry) => {
           if (entry.isIntersecting) {
             // let elem = entry.target;
             // console.log(elem)
             console.log(entry.target);
             console.log("intersecting");
           }
           // else {
           //   console.log("not intersecting");
           // }
           // Each entry describes an intersection change for one observed
           // target element:
           //   entry.boundingClientRect
           //   entry.intersectionRatio
           //   entry.intersectionRect
           //   entry.isIntersecting
           //   entry.rootBounds
           //   entry.target
           //   entry.time
         });
       };

       pids.forEach((pid) => {
         let target = document.getElementById(pid);
         const observer = new IntersectionObserver((entries) => {
           callback(entries, observer);
         }, options);
         observer.observe(target);
       });
     }
     // return () => {
     //   observer.disc
     // }
   }, [scrollNumber]);

   function handleScroll(e) {
     setScrollNumber(Math.random());
   }


  return (
    <Layout>
      <Row id="main-row">
        <Col id="image-col">
          <div id="image-tool">
            {/* <IconContext.Provider value={{ className: "left-arrow-icon" }}> */}
            <div id="left-arrow-icon" onClick={() => getPrevImage()}></div>
            {/* </IconContext.Provider> */}

            {/* <IconContext.Provider value={{ className: "right-arrow-icon" }}> */}
            <div
              id="right-arrow-icon"
              size={28}
              onClick={() => getNextImage()}
            ></div>
            {/* </IconContext.Provider> */}
          </div>

          <div id="journal-image">
            <Viewer imageId={currentPid}></Viewer>
          </div>
        </Col>

        <Col id="journal-col">
          <div
            className="general-text"
            id="journal-transcript"
            ref={ref}
            onScroll={handleScroll}
          >
            {props.children}
          </div>
        </Col>
      </Row>
      <Row id="journal-pagination-row">
        <Col>
          <Button variant="outline-warning" onClick={() => getPrevCetei()}>
            <Link
              style={{ color: "white" }}
              className="btn-g-link"
              to={"/" + cetei}
            >
              Previous Journal
            </Link>
          </Button>
          <Button
            id="next-journal"
            variant="outline-warning"
            onClick={() => getNextCetei()}
          >
            <Link
              style={{ color: "white" }}
              className="btn-g-link"
              to={"/" + cetei}
            >
              Next Journal
            </Link>
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};;

export default Volume;
