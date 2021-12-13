import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import "../styles/volume.scss";
import { IconContext } from "react-icons";
import { BsArrowRight, BsArrowLeft, BsTriangleFill } from "react-icons/bs";
import { Container, Row, Button, Col, Collapse, Form, InputGroup } from "react-bootstrap";
// import  OpenSeadragonViewer  from "./OpenSeadragonViewer";
import Layout from "./Layout";
import JournalImage from "./JournalImage";
import Viewer from "./Viewer";
import { months } from "../globalVariables";

import { scroller } from "react-scroll";

const parseString = require("xml2js").parseString;

function getTitle(journal){

let header  = journal["tei-TEI"]["tei-teiHeader"][0] || undefined;

if(header && "tei-fileDesc" in header){

  let title =
    header["tei-fileDesc"][0]["tei-titleStmt"][0][
      "tei-title"
    ][0]._.split(":")[0].split(",")[0] || "John Hunt Journal";

  // let date =
  //   header["tei-teiHeader"]["tei-profileDesc"][0]["tei-creation"][0][
  //     "tei-date"
  //   ][0]._.split("-") || "";

  let detailedDateStr =
    header["tei-fileDesc"][0]["tei-titleStmt"][0][
      "tei-title"
    ][0]._.split(":")[0].split(",")[1];

  let detailedDate = detailedDateStr.split("-");
  let beginningDate = detailedDate[0].trim().split(/\s+/);

  let endingDate =
    detailedDate.length > 1 ? detailedDate[1].trim().split(/\s+/) : "";

  let beginningYear = beginningDate[0] != undefined ? beginningDate[0] : "";

  let beginningMonth = beginningDate[1] != undefined ? beginningDate[1] : "";
  beginningMonth =
    beginningMonth != undefined ? parseInt(beginningMonth.slice(0, -3)) : "";

  let beginningDay = beginningDate[2] != undefined ? beginningDate[2] : "";

  let endingYear = endingDate[0] != undefined ? endingDate[0] : "";
  let endingMonth = endingDate[1] != undefined ? endingDate[1] : "";
  endingMonth = endingMonth != undefined ? endingMonth.slice(0, -3) : "";
  let endingDay = endingDate[2] != undefined ? endingDate[2] : "";

  return {
    title: title,
    startMonth: beginningMonth,
    startDay: beginningDay,
    startYear: beginningYear,

    endMonth: endingMonth,
    endDay: endingDay,
    endYear: endingYear,
    detailedDateStr: detailedDateStr,
  };

}
  return null;

}

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

const Volume = (props) => {
  const { pageContext, facs, data, hash } = props;
  // console.log(pageContext.prefixed);
  let pids = facs;
  let pageBreakIDs = [];

  let jsonPrefixed;
  parseString(pageContext.prefixed, function (err, result) {
    jsonPrefixed = result;
  });
  console.log(jsonPrefixed)

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
  const [currentPid, setPid] = useState(pids[0]);

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
    setPid(page)
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
 console.log("Current pid:", currentPid);
 console.log("All Pids: ", pids);

  function getNextImage() {
    let i = pids.indexOf(currentPid);
    if (i < pids.length - 1) {
       scroll(pids[i + 1]);
    }
  }

  /**
   * Find and get the index of the previous pid relative to th @currentPid
   * Scroll to the page corresponding to this previous pud and set that pid to be the @currentPid
   */

  const [isOnWheel, setIsOnWheel] = useState(false)

  function getPrevImage() {
      let i = pids.indexOf(currentPid);
      if (i > 0) {
        scroll(pids[i-1]);
      }
  }


  const [jump, setJump] = useState(0);

  function handleKeyDown(e) {
     if (e.key === "Enter") {
       let val = e.target.value
      if(val !== '' && val%1 === 0 && val <= pids.length && val >=1){
        setJump(e.target.value-1);
      }

     }
  }

  const [visiblePid, setVisiblePid] = useState(pids[0])

  useEffect(() => {
    console.log(jump);
    scroll(pids[jump])

  }, [jump])

  console.log("Current pid:",  currentPid)

   const [scrollNumber, setScrollNumber] = useState(0);

   useEffect(() => {
     if (window !== undefined && document !== undefined) {
        let options = {
          root: document.getElementById("journal-transcript"),
          rootMargin: "0px",
          threshold: 0,
        };

       let callback = (entries, observer) => {
         entries.forEach((entry) => {
           if (entry.isIntersecting) {
             let visiblePid = entry.target.getAttribute("id");
            //  if(isOnWheel){
               setVisiblePid(visiblePid);
            //  }
            //  setIsOnWheel(!isOnWheel)
           }


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
    //  return () => {

    //  }
   }, [scrollNumber]);

   function handleWheel(e) {
     console.log("scrolling")
    //  setIsOnWheel(true);
     setScrollNumber(Math.random());
     setPid(visiblePid)
   }

function renderTitle(journalMetadata){
  return (
    <h1 className="general-text header3">
      <span >
        {`${journalMetadata.title}`}
      </span>
      <span >
        {/* `{}` */}
        <span >      from {` `}</span>
        {journalMetadata.startMonth ? (
          <span >{`${
            months[journalMetadata.startMonth - 1].name
          } `}</span>
        ) : (
          ""
        )}
        {journalMetadata.startDay ? (
          <span >{`${journalMetadata.startDay}, `}</span>
        ) : (
          ""
        )}
        {journalMetadata.startYear ? (
          <span >{`${journalMetadata.startYear}`}</span>
        ) : (
          ""
        )}
        {journalMetadata.startYear != undefined ? <span>  to {` `}</span> : ""}
        {journalMetadata.endMonth ? (
          <span >{`${
            months[journalMetadata.endMonth - 1].name
          } `}</span>
        ) : (
          ""
        )}
        {journalMetadata.endDay ? (
          <span >{`${journalMetadata.endDay}, `}</span>
        ) : (
          ""
        )}
        {journalMetadata.endYear ? (
          <span >{`${journalMetadata.endYear}`}</span>
        ) : (
          "Unknown"
        )}
        {/* {`${beginningMonth} ${beginningDay}, ${beginningYear} to ${endingMonth} ${endingDay}, ${endingYear}`} */}
      </span>
    </h1>
  );
}
  return (
    <Layout>
      <Row style={{fontSize: "15px", padding:"10px"}}>{renderTitle(getTitle(jsonPrefixed))}</Row>
      <Row id="main-row">
        <div id="image-tool">
          {/* <IconContext.Provider value={{ className: "left-arrow-icon" }}> */}
          <div id="left-arrow-icon" onClick={() => getPrevImage()}></div>
          <InputGroup hasValidation style={{ width: "15vw" }}>
            <Form.Control
              required
              size="sm"
              type="number"
              placeholder="jump to "
              onKeyDown={handleKeyDown}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Invalid type
            </Form.Control.Feedback>
          </InputGroup>
          {/* <Form.Control
            size="sm"
            type="number"
            placeholder="jump to "
            onKeyDown={handleKeyDown}
            style={{ width: "15vw" }}
          ></Form.Control> */}
          {/* <span class="general-text">Current Page: at {pids.indexOf(currentPid)+1} of {pids.length}</span> */}
          <span class="general-text">
            Current Page: at {pids.indexOf(currentPid) + 1} of {pids.length}
          </span>
          <div
            id="right-arrow-icon"
            size={28}
            onClick={() => getNextImage()}
          ></div>
          {/* </IconContext.Provider> */}
        </div>
        <Col id="image-col">
          <div id="journal-image">
            <Viewer imageId={currentPid}></Viewer>
          </div>
        </Col>

        <Col id="journal-col">
          <div
            className="general-text"
            id="journal-transcript"
            ref={ref}
            onWheel={handleWheel}
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
