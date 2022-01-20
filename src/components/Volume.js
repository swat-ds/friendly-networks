import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "gatsby";
import "../styles/volume.scss";
import { Row, Button, Col, Form, InputGroup } from "react-bootstrap";

import Layout from "./Layout";
import Viewer from "./Viewer";

import { scroller } from "react-scroll";

const parseString = require("xml2js").parseString;

function getTitle(journal){
  return (
    journal["tei-TEI"]["tei-teiHeader"][0]["tei-fileDesc"][0]
      ["tei-titleStmt"][0]["tei-title"][0]["_"].split(":")[0]
    );
}

function getAllFacs(xmlString) {
  const rgx = /<tei-pb[^>]+facs="([^">]+)"/g;
  // ex: <tei-pb n="1" facs="(sc123)">
  const matches = xmlString.matchAll(rgx);
  const facses = Array.from(matches, m => m[1]) // Get array of capture grps
  return facses;
}


// TODO: Add documentation explaining why this exists
// Also, explain that it targets <hr> elements or single-line spans
function spacePageBreaks(node) {
  // Get an array of all descendant .pb nodes
  const breakNodes = Array.from(node.querySelectorAll(".tei-pb"));

  // Get half of node's height
  const halfHeight = node.clientHeight/2;

  //---------------- Handle space btwn 1st and 2nd pb ----------------//
  // Get DOM nodes
  const [one, two] = [ breakNodes[0], breakNodes[1] ];

  // Strip existing inline styling from 2nd pb (to properly assess distance)
  if (two.hasAttribute("style")) {
    two.removeAttribute("style");
  }
  // Get node positions
  const [pos1, pos2] = [one, two].map(x => x.getBoundingClientRect().top);

  // Check distance between 1st and 2nd pb
  var dist = pos2 - pos1;

  // Ensure distance >= halfHeight by adjusting 2nd pb's top margin if needed
  if (dist < halfHeight) {
    two.setAttribute("style", `margin-top: ${halfHeight*1.2-dist}px;`)
  }

  //----------- Handle space btwn last pb & bottom of container -----------//
  // Get DOM nodes
  const last = breakNodes[breakNodes.length-1];
  const mainList = node.querySelectorAll("main");
  // (^ Handles multiple <tei-text> elements in one doc)
  const main = mainList[mainList.length-1];

  // Strip existing inline styling from main (to properly assess distance)
  if (main.hasAttribute("style")) {
    main.removeAttribute("style");
  }
  // Get node positions & check distance between them
  const lastBottom = last.getBoundingClientRect().bottom;
  const mainBottom = main.getBoundingClientRect().bottom;
  dist = mainBottom - lastBottom;

  console.log(dist, "dist", halfHeight, "halfHeight");

  // Ensure distance >= halfHeight by adjusting main's bottom padding
  if (dist < halfHeight) {
    main.setAttribute("style", `padding-bottom: ${halfHeight*1.2-dist}px;`)
  }
};


let counter = 0; // counter for to tract the index of each transcript (cetei)

/**
 * An all-encompassing component for the journal display; the image and the transcript
 * @param {*} props the properties to be passed when used this component
 * @returns a component, containing the OpenSeaDragon and transcript, for each journal
 */

 const Volume = (props) => {
 		const {
 			pageContext,
 			facs,
 			data,
 			hash
 		} = props;

    // Redirect from /[pid] to /journals/[pid]
    useEffect(() => {
      if (document && ! document.location.pathname.includes("journal")) {
        document.location.replace("/journals" + document.location.pathname);
      }
    }, [])

 		let jsonPrefixed;
 		parseString(pageContext.prefixed, function(err, result) {
 			jsonPrefixed = result;
 		});

    const prefixed = pageContext.prefixed;
    const pids = getAllFacs(prefixed)

 		// counter = name_index.has(pageContext.name)? name_index.get(pageContext.name) : 0;
 		const [cetei, setCetei] = useState(data.allCetei.nodes[counter].parent.name);

 		//State to set pid (constellation id)
 		const [currentPid, setPid] = useState(pids[0]);

 		//Sets the current cetei with the next cetei
 		function getNextCetei() {
 			counter += 1;
 			setCetei(data.allCetei.nodes[counter].parent.name);
 			console.log(counter);
 			// console.log(data.allCetei.nodes[counter].parent.name);
 		}

 		//Sets the current cetei to the previous cetei
 		function getPrevCetei() {
 			setCetei(data.allCetei.nodes[counter--].parent.name);
 		}


    // Get reference to transcript container div using useRef
    const containerRef = useRef(null);

    // Initialize state to track midpoint of container
    const [halfHeight, setHalfHeight] = useState(0);

    // Initialize state to track distances between .tei-pb elements
    const [distances, setDistances] = useState([0]);

    // Scroll transcript to next pagebreak
    function getPrevImage() {
      const currentIndex = pids.indexOf(currentPid);
      if (currentIndex >= 1) {
        containerRef.current.scroll(0, distances[currentIndex-1]);
        // setPid(pids[currentIndex-1]);
      }
    };

    // Scroll transcript to next pagebreak
    function getNextImage() {
      const currentIndex = pids.indexOf(currentPid);
      if (currentIndex <= pids.length - 1) {
        containerRef.current.scroll(0, distances[currentIndex+1]);
        // setPid(pids[currentIndex+1]);
      }

    };

    const handleResize = useCallback(() => {
      console.log("In handle resize");

      // Don't do anything if the ref's DOM node hasn't loaded yet
      if (containerRef.current === null) {
        return;
      }

      // Get half the height of the container
      setHalfHeight(containerRef.current.clientHeight/2);

      // Adjust pagebreak spacing, if necessary
      if (pids.length > 1){
        spacePageBreaks(containerRef.current);
      }


      ////// Get distances between pagebreaks and top of container //////
      ////// ===================================================== //////

      // Get coords of first pagebreak
      const firstPbSelector = "[data-facs=\"" + pids[0] + "\"]";
      const firstPb = containerRef.current?.querySelector(firstPbSelector);
      const start = firstPb?.getBoundingClientRect().top;

      // Get distances by looping over list of pids
      const dists = pids.map(pid => {
        const selector = "[data-facs=\"" + pid + "\"]";
        const node = containerRef.current.querySelector(selector);
        if (!node) {
          console.log("Cannot find element with @data-facs " + pid);
        }
        return node ? node.getBoundingClientRect().top - start : null;
      })
      // Write distances to useState
      setDistances(dists)

    }, [pids])

    // Add resize event listener to window if there's more than 1 page
    useEffect(() => {
      if (pids.length > 1) {

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    }, [halfHeight, handleResize, distances, pids.length]);

    // Run handleResize once on startup
    useEffect(() => {
      handleResize();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    function handleScroll(e) {
      // No point tracking page number if there's only 1 pg
      if (pids.length < 2) {return;}

      // Find the line dividing content above vs below scrollbox midpoint
      const scrollTop = e.currentTarget.scrollTop;
      const divider = scrollTop + halfHeight;

      // Check how many pagebreaks are above divider
      const pageNum = distances.filter(pos => pos <= divider).length - 1;

      // Set currentPid useEffect, if not already at appropriate value
      if (pids[pageNum] !== currentPid) {
        setPid(pids[pageNum])
      }

    };

    /**
     * Handle the change when a new value is entered on the input
     * @param {*} e the event
     */
 		function handleKeyDown(e) {
 			if (e.key === "Enter") {
 				let val = e.target.value
 				if (val !== '' && val % 1 === 0 && val <= pids.length && val >= 1) {
 					containerRef.current.scroll(0, distances[val-1])
 				}

 			}
 		}

 		return (
      <Layout>
        <Row style={{fontSize: "15px",padding:"10px"}}>
          <h1 className="general-text header3">{getTitle(jsonPrefixed)}</h1>
        </Row>
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
              ref={containerRef}
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
                to={"/journals/" + cetei}
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
                to={"/journals/" + cetei}
              >
                Next Journal
              </Link>
            </Button>
          </Col>
        </Row>
      </Layout>
  );
};

export default Volume;
