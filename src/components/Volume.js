import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "gatsby";
import "../styles/volume.scss";
import { Row, Button, Col, Form, InputGroup } from "react-bootstrap";
// import  OpenSeadragonViewer  from "./OpenSeadragonViewer";
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

function getDivBreaks(divList) {
  let divBreaks = [];
  divList.forEach((div) => {
    if ("tei-pb" in div) {
      div["tei-pb"].forEach((pb) => divBreaks.push(pb.$.facs));
    }

    // Check each para in the div for <pb>; add facs to divBreaks if found
    if ("tei-p" in div) {
      let paraList = div["tei-p"];
      paraList.forEach((para) => {
        if ("tei-pb" in para){
          para["tei-pb"].forEach((pb) => divBreaks.push(pb.$.facs));
        }
      });
    }
  });
  return divBreaks;
}

function getAllPageBreaks(jsonPrefixed) {
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



function spaceBreakPair([breakNode1, breakNode2]){
  // TODO: Implement
}

// TODO: Add documentation explaining why this exists
// Also, explain that it targets <hr> elements or single-line spans
function spacePageBreaks(node) { // TODO: Finish
  // Get an array of all descendant .pb nodes
  const breakNodes = Array.from(node.querySelectorAll(".tei-pb"))

  // Case if there is 1 page
  if (breakNodes.length === 0) {return}

  // If there are at least 2 pages
  spaceBreakPair(breakNodes[0], breakNodes[1])

  // Case if there are 3 or more pages

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
 		let jsonPrefixed;
 		parseString(pageContext.prefixed, function(err, result) {
 			jsonPrefixed = result;
 		});

    // console.log("Volume facs", facs);
    const pids = getAllPageBreaks(jsonPrefixed);
    console.log("volume pids", pids);

    if (pids.length === 0) {pids.push("sc203351")}

 		// counter = name_index.has(pageContext.name)? name_index.get(pageContext.name) : 0;
 		const [cetei, setCetei] = useState(data.allCetei.nodes[counter].parent.name);

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
 			// console.log(data.allCetei.nodes[counter].parent.name);
 		}

 		//Sets the current cetei to the previous cetei
 		function getPrevCetei() {
 			setCetei(data.allCetei.nodes[counter--].parent.name);
 		}

    function getPrevImage() {};

    function getNextImage() {};

    // Get reference to transcript container div using useRef
    const containerRef = useRef(null);

    // Initialize state to track midpoint of container
    const [halfHeight, setHalfHeight] = useState(0);

    // Initialize state to track distances between .tei-pb elements
    const [distances, setDistances] = useState([0]);

    const handleResize = useCallback(() => {
      console.log("In handleResize");

      // Don't do anything if the ref's DOM node hasn't loaded yet
      if (containerRef.current === null) {
        console.log("Ref is null");
        return;
      }

      // Get half the height of the container
      setHalfHeight(containerRef.current.clientHeight/2)

      // Adjust pagebreak spacing, if necessary
      spacePageBreaks(containerRef.current)

      ////// Get distances between pagebreaks and top of container /////

      // Get coords of first pagebreak
      const firstPb = containerRef.current?.querySelector("#" + pids[0]);
      const start = firstPb?.getBoundingClientRect().top;

      // Get distances by looping over list of pids
      const dists = pids.map(pid => {
        const node = containerRef.current.querySelector("#" + pid);
        if (!node) {console.log("Cannot find element with @id " + pid);}
        return node ? node.getBoundingClientRect().top - start : null;
      })

      // Write distances to useState
      setDistances(dists)

    }, [pids])

    useEffect(() => {
      console.log("In resize useEffect");

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [halfHeight, handleResize, distances]);

    console.log("halfHeight", halfHeight);
    console.log("breaks", distances);


    function handleWheel(e) {
      if (! halfHeight || halfHeight === 0) {

        handleResize();
      }

      // No point checking scroll to see what page we're on if there's only 1 pg
      if (pids.length < 2) {return;}

      // Find the line dividing content above vs below scrollbox midpoint
      const scrollTop = e.currentTarget.scrollTop;
      const divider = scrollTop + halfHeight;
      // console.log("divider", divider, "3rd break", distances[2]);

      // Check how many pagebreaks are above divider
      const pageNum = distances.filter(pos => pos < divider).length - 1;
      console.log("Page Number", pageNum + 1);

      // Set currentPid useEffect, if not already at appropriate value
      console.log("pid", pids[pageNum]);
      setPid(pids[pageNum])

    }

    // Create a ResizeObserver to update landmarks on container resize
   /* useEffect(()=> {
      const observer = new ResizeObserver(entries => {
        const entry = entries[0] // We should only ever have one entry
        console.log(entry);
        // if browser supports newer API property contentBoxSize
        if (entry?.contentBoxSize) {
          setHalfHeight(entry.contentBoxSize[0].blockSize)
          console.log("halfHeight: ", halfHeight);
        }
      });
      observer.observe(container.current);
      return function cleanup() {
        observer.disconnect();
      };
    },[container.current]);
    */


 		// /**
 		//  * Implements the scroll functionality for th transcript
 		//  * @param {*} page the page to be scrolled to
 		//  */
 		// function scroll(page) {
 		// 	scroller.scrollTo(page, {
 		// 		duration: 800,
 		// 		delay: 0,
 		// 		smooth: "easeInOutQuart",
 		// 		containerId: "journal-transcript",
 		// 	});
 		// 	setPid(page)
 		// }
    //
    // /////////////////////////////////////////////////////////
 		// /**
 		//  * Possible patterns:
 		//  * 1. http://localhost:8000/sc203246?/#pid=sc203683
 		//  * 2. http://localhost:8000/sc203246/#pid=sc203683
 		//  * Nothing needs to be changed for the scrolling whatsoever, both works.
 		//  */
 		// // if (hash !== "") {
    // //   // If current hash doesn't match current pid's place in list of pids
    // //   if ("#" + toString(pids.indexOf(currentPid)) !== window.location.hash){
    // //     let hashPid = hash.substring(5); // => #pid=sc203683 becomes sc203683
   	// // 		scroll(hashPid);
    // //   }
 		// // }
    // ///////////////////////////////////////////////////////
 		// /**
 		//  * Find and get the index of the next pid relative to th @currentPid
 		//  * Scroll to the page corresponding to this next pud and set that pid to be the @currentPid
 		//  */
 		// console.log("Current pid:", currentPid);
    //
 		// function getNextImage() {
 		// 	let i = pids.indexOf(currentPid);
 		// 	if (i < pids.length - 1) {
 		// 		scroll(pids[i + 1]);
 		// 	}
 		// }
    //
 		// /**
 		//  * Find and get the index of the previous pid relative to th @currentPid
 		//  * Scroll to the page corresponding to this previous pud and set that pid to be the @currentPid
 		//  */
    //
 		// // const [isOnWheel, setIsOnWheel] = useState(false)
    //
 		// function getPrevImage() {
 		// 	let i = pids.indexOf(currentPid);
 		// 	if (i > 0) {
 		// 		scroll(pids[i - 1]);
 		// 	}
 		// }
    //
    //
 		// const [jump, setJump] = useState(0);

 		function handleKeyDown(e) {
 			// if (e.key === "Enter") {
 			// 	let val = e.target.value
 			// 	if (val !== '' && val % 1 === 0 && val <= pids.length && val >= 1) {
 			// 		setJump(e.target.value - 1);
 			// 	}
      //
 			// }
 		}

 		// const [visiblePid, setVisiblePid] = useState(pids[0])
    //
 		// useEffect(() => {
 		// 	// console.log(jump);
 		// 	scroll(pids[jump])
    //
 		// }, [jump])
    //
 		// // console.log("Current pid:",  currentPid)
    //
 		// const [scrollNumber, setScrollNumber] = useState(0);
    //
 		// useEffect(() => {
 		// 	if (window !== undefined && document !== undefined) {
    //
    //     // Define options to be used by IntersectionObserver
 		// 		let options = {
 		// 			root: document.getcontainer.currentById("journal-transcript"),
 		// 			rootMargin: "0px",
 		// 			threshold: 1,
 		// 		};
    //
    //     // Define fx to be used by IntersectionObserver
 		// 		let callback = (entries, observer) => {
 		// 			entries.forEach(entry => {
 		// 				if (entry.isIntersecting) {
 		// 					let visiblePid = entry.target.getAttribute("id");
 		// 					//  if(isOnWheel){
 		// 					setVisiblePid(visiblePid);
 		// 					//  }
 		// 					//  setIsOnWheel(!isOnWheel)
 		// 				}
    //
    //
 		// 			});
 		// 		};
    //
 		// 		pids.forEach(pid => {
 		// 			let target = document.getcontainer.currentById(pid);
 		// 			const observer = new IntersectionObserver(entries => {
 		// 				callback(entries, observer);
 		// 			}, options);
 		// 			observer.observe(target);
 		// 		});
 		// 	}
 		// 	//  return () => {
    //
 		// 	//  }
 		// }, [scrollNumber]);
    //
 		// function handleWheel(e) {
 		// 	 console.log("scrolling")
 		// 	//  setIsOnWheel(true);
 		// 	setScrollNumber(Math.random());
 		// 	setPid(visiblePid)
    //
    //   let hrs = pids.map(pid => {
    //     return document.getcontainer.currentById(pid).getBoundingClientRect().top;
    //   });
    //   console.log("Pagebreak positions:", hrs.slice(0,9));
    //
    //
    //   // Change URL to reflect current page
    //   const pathname = document.location.pathname.slice(-1) === "/"
    //     ? document.location.pathname.slice(0, -1) // remove trailing / if found
    //     : document.location.pathname;
    //   const newHash = "#" + (pids.indexOf(currentPid) + 1).toString();
    //   window.history.replaceState(null, "",  pathname + newHash);
 		// }

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
