import React from "react";
import { useState, useEffect, useRef } from "react";
import "../assets/styles/styles.scss";
import { Container, Row, Button, Col } from "react-bootstrap";
import { OpenSeadragonViewer } from "./OpenSeadragonViewer";
import Layout from "./Layout";
import { Link } from "gatsby";
import { scroller } from "react-scroll";

let counter = 1; // counter for to tract the index of each transcript (cetei)
let currentInput = 0; // variable for the input value for the scroll

/**
 * An all-encompassing component for the journal display; the image and the transcript
 * @param {*} props the properties to be passed when used this component
 * @returns a component, containing the OpenSeaDragon and transcript, for each journal
 */
const Volume = (props) => {
  const { pageContext, data } = props;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(pageContext.prefixed, "text/xml");
  const pages = xmlDoc.getElementsByTagName("tei-pb");

  let pids = [];
  for (let index = 0; index < pages.length; index++) {
    pids.push(pages[index].attributes.getNamedItem("facs").value);
  }

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
    scroll(pids[i]);
    setPid(pids[i]);
  }

  /**
   * Find and get the index of the previous pid relative to th @currentPid
   * Scroll to the page corresponding to this previous pud and set that pid to be the @currentPid
   */
  function getPrevImage() {
    let i = pids.indexOf(currentPid) - 1;
    console.log(i, pids[i]);
    scroll(pids[i]);
    setPid(pids[i]);
  }

  // A wrapper function for the scroll()
  function handleClick() {
    scroll(currentPid);
  }

  return (
    <Layout>
      <Row>
        <Col>
          <Button variant="outline-info" onClick={() => getPrevImage()}>
            Previous Page
          </Button>
        </Col>

        <Col sm={8}>
          <input onChange={onChange} placeholder={""} />
          <Button
            variant="outline-info"
            style={{ position: "fixed" }}
            onClick={() => handleClick()}
          >
            Scroll
          </Button>
        </Col>
        <Col md={{ offset: 7 }}>
          <Button variant="outline-info" onClick={() => getNextImage()}>
            Next Page
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <OpenSeadragonViewer imageId={currentPid} />
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
