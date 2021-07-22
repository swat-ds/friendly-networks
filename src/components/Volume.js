import React from "react";
import { useState, useEffect } from "react";
import "../assets/styles/styles.scss";
import { Container, Row, Button, Col } from "react-bootstrap";
import { OpenSeadragonViewer } from "./OpenSeadragonViewer";
import Layout from "./Layout";
import { Link } from "gatsby";
import { scroller } from "react-scroll";

let counter = 1;
let counter2 = 0;
let currentInput = 0;
// Creating a custom hook

const Volume = (props) => {
  const { pageContext, data } = props;

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(pageContext.prefixed, "text/xml");
  const pages = xmlDoc.getElementsByTagName("tei-pb");

  let pids = [];
  for (let index = 0; index < pages.length; index++) {
    pids.push(pages[index].attributes.getNamedItem("facs").value);
  }
  console.log(pids);

  function useInput(defaultPid, pages) {
    const [currentInputPid, setCurrentInputPid] = useState(defaultPid);
    function onChange(e) {
      currentInput = e.target.value;
      e.preventDefault();
      console.log(pages[e.target.value - 1]);
      if (pages[e.target.value]) {
        setCurrentInputPid(
          pages[e.target.value - 1].attributes.getNamedItem("facs").value
        );
      }
    }
    return {
      currentInputPid,
      onChange,
    };
  }
  const inputProps = useInput(pids[currentInput], pages);

  // useEffect(() => {
  //   const hrs = document.getElementsByTagName("hr");
  //   const section = document.getElementsByTagName("section");
  //   console.log(hrs);
  // }, []);

  const [cetei, setCetei] = useState(data.allCetei.nodes[counter].parent.name);
  // console.log(data.allCetei.nodes);

  const [currentPid, setPid] = useState(inputProps.currentInputPid);

  function getNextCetei() {
    //  console.log(counter);
    setCetei(data.allCetei.nodes[counter++].parent.name);
    // console.log(data.allCetei.nodes[counter].parent.name);
  }
  function getPrevCetei() {
    // console.log(counter);
    setCetei(data.allCetei.nodes[counter--].parent.name);
    // console.log(data.allCetei.nodes[counter].parent.name);
  }

  function scroll(page) {
    scroller.scrollTo(page, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      containerId: "journal",
    });
  }
  function getNextImage() {
    let i = pids.indexOf(currentPid) + 1;
    console.log(i, pids[i]);
    setPid(pids[i]);
    scroll(pids[i]);
  }
  function getPrevImage() {
    let i = pids.indexOf(currentPid) - 1;
    console.log(i, pids[i]);
    setPid(pids[i]);
    scroll(pids[i]);
  }

  function handleClick() {
    setPid(pids[currentInput]);
    scroll(inputProps.currentPid);
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
          {/* <h1>
            {inputProps.currentPid}: which is{" "}
            {inputProps.currentPid.slice(-2)} of {pages.length}{" "}
          </h1> */}
          <input {...inputProps} placeholder={""} />
          {/* <scrollLink to={inputProps.currentPid} spy={true} smooth={true}>
            Jump
          </scrollLink> */}
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
