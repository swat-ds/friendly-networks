import React, { useMemo } from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, navigate } from "gatsby";
import "../styles/volume.scss";
import { Row, Button, Col, Form, InputGroup, Card } from "react-bootstrap";
import Layout from "./Layout";
import Viewer from "./Viewer";


const parseString = require("xml2js").parseString;

function getTitle(journal){
  return (
    journal["tei-TEI"]["tei-teiHeader"][0]["tei-fileDesc"][0]
      ["tei-titleStmt"][0]["tei-title"][0]["_"].split(":")[0]
    );
}
/**
 * 
 * @param {*} journal Parsed TEI XML that has an element 
 *                      TEI/teiHeader/fileDesc/sourceDesc/msDesc/msIdentifier/idno
 * @returns {string} the node id encoded in that TEI file
 */
function getNodeId(journal) {
  // Drill down into proper section of TEI header containing the <idno> elements
  const ids = journal["tei-TEI"]["tei-teiHeader"][0]["tei-fileDesc"][0]
    ["tei-sourceDesc"][0]["tei-msDesc"][0]["tei-msIdentifier"][0]["tei-idno"]
  
  // Get the value of <idno type="Islandora node_id">
  const nodeIdEl = ids.find(element => element["$"]["type"] === "IslandoraNodeid")
  const nodeId = nodeIdEl['_']
  return nodeId;
}

async function fetchAsync(url) {
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData;
}

/**
 * Extracts the IIIF Image API urls from a IIIF presentation manifest
 * @param {object} manifest A IIIF presentation manifest
 * @returns {Array} of strings of urls, each ending in "info.json"
 */
function getImageUrls(manifest) {
  const iiifCanvases = manifest.sequences[0].canvases
  const urls = iiifCanvases.map(canvas => canvas.images[0].resource.service["@id"])
  return urls
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

  // Ensure distance >= halfHeight by adjusting main's bottom padding
  if (dist < halfHeight) {
    main.setAttribute("style", `padding-bottom: ${halfHeight*1.2-dist}px;`)
  }
};


let counter = 0; // counter to track the index of each transcript (cetei) 

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


    // Redirect from /[id] to /journals/[id]
    useEffect(() => {
      if (document && ! document.location.pathname.includes("journal")) {
        document.location.replace("/journals" + document.location.pathname);
      }
    }, [])


    // Parse the TEI file
 		let jsonPrefixed;
 		parseString(pageContext.prefixed, function(err, result) {
 			jsonPrefixed = result;
 		});

    // Extract the PIDs from the parsed TEI
    const prefixed = pageContext.prefixed;
    const pids = getAllFacs(prefixed);

    const [imagesFetched, setFetched] = useState(false)
    // Get image URLs to send to OSD
    const imageUrls = useMemo(() => {
      const imageUrls = []
      const nodeId = getNodeId(jsonPrefixed)
      const url = `https://digitalcollections.tricolib.brynmawr.edu/node/${nodeId}/manifest`
      const manifest = fetchAsync(url) // Get IIIF presentation manifest
      manifest.then(data => imageUrls.push(...getImageUrls(data)))
        .then(() => setFetched(true))
      return imageUrls
    }, []);
    
    if (imageUrls.length !== pids.length && imagesFetched ) {
      console.warn("Mismatch between number of images & number of pagebreaks!");
      console.log(pids.length + " pagebreaks");
      console.log(imageUrls.length + " images (after filtering out wide images)");
    }

    const [currentPage, setPage] = useState(0)

    const names = data.allCetei.nodes.map(node => node.parent.name).sort()
    
    // Navigate to next journal
    function getNextCetei() {
      const name = pageContext.name
      const index = names.indexOf(name)
      if (index < names.length-1) {
        navigate("/journals/" + names[index+1])
      }
    }
    
 		//Sets the current cetei to the previous cetei
 		function getPrevCetei() {
      const name = pageContext.name
      const index = names.indexOf(name)
      if (index > 0) {
        navigate("/journals/" + names[index-1])
       }
 		}


    // Get reference to transcript container div using useRef
    const containerRef = useRef(null);

    // Initialize state to track midpoint of container
    const [halfHeight, setHalfHeight] = useState(0);

    // Initialize state to track distances between .tei-pb elements
    const [distances, setDistances] = useState([0]);

    // Scroll transcript to next pagebreak
    function getPrevImage() {
      if (currentPage >= 1) {
        containerRef.current.scroll(0, distances[currentPage-1]);
      }
    };

    // Scroll transcript to next pagebreak
    function getNextImage() {
      if (currentPage <= pids.length - 1) {
        containerRef.current.scroll(0, distances[currentPage+1]);
      }

    };

    const handleResize = useCallback(() => {

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

      // Set currentPage useEffect, if not already at appropriate value
      if (pageNum !== currentPage) {
        setPage(pageNum)
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

    // Handle scrolling to the page indicated in the URL on load:
    useEffect(()=>{
      if (typeof window !== 'undefined' && window.location.hash) {
        const pageNum = window.location.hash.slice(1);
        console.log(pageNum);
        // const pageBreak = 
      }
    }, [])


 		return (
      <Layout id="journal">
      <Row id="main-row">
        <Row>
          <h1 className="general-text header3">{getTitle(jsonPrefixed)}</h1>
        </Row>
        <div id="image-tool">
          {/* <IconContext.Provider value={{ className: "left-arrow-icon" }}> */}
          <button 
            id="left-arrow-icon" 
            onClick={() => getPrevImage()} 
            role="button"
            disabled = {currentPage === 0}
          />
          <InputGroup hasValidation style={{ width: "15vw" }}>
            <Form.Control
              required
              size="sm"
              type="number"
              placeholder="jump to page..."
              onKeyDown={handleKeyDown}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Invalid type
            </Form.Control.Feedback>
          </InputGroup>
          <span class="general-text">
            Page <strong>{currentPage + 1}</strong> of {pids.length}
          </span>
          <button
            id="right-arrow-icon"
            onClick={() => getNextImage()}
            role="button"
            disabled={currentPage === imageUrls.length - 1}
          />
        </div>
        <Row id="journal-display">
          <Col id="image-col">
            <div id="journal-image">
              <Viewer tileSources={imageUrls} currentPage={currentPage}/>
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
        <Row id="journal-next-prev-citation">
          <Col>
            <Button 
              id="prev-journal"
              variant="outline-warning"
              role="link"
              onClick={() => getPrevCetei()}
              disabled={names.indexOf(pageContext.name) < 1}
            >
              Prev Journal
            </Button>
          </Col>
          <Col id="preferred-citation">
            <Card bg="primary">
            <Card.Header>
              <Card.Title>Preferred Citation</Card.Title>
            </Card.Header>
              <Card.Body>
                <Card.Text>
                  {getTitle(jsonPrefixed)}, 
                  John Hunt Papers, SFHL-RG5-240, 
                  Friends Historical Library of Swarthmore College 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Button
              id="next-journal"
              variant="outline-warning"
              role="link"
              onClick={() => getNextCetei()}
              disabled={names.indexOf(pageContext.name) >= names.length-1}
            >
              Next Journal
            </Button>
          </Col>
        </Row>
        </Row>
      </Layout>
  );
};

export default Volume;
