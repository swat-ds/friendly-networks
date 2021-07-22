import React from "react";
import { useState, useEffect, useRef } from "react";
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

  // useEffect(() => {
  //   const hrs = document.getElementsByTagName("hr");
  //   const section = document.getElementsByTagName("section");
  //   console.log(hrs);
  // }, []);

  const [cetei, setCetei] = useState(data.allCetei.nodes[counter].parent.name);
  // console.log(data.allCetei.nodes);
  function onChange(e) {
    currentInput = e.target.value;
    e.preventDefault();
  }
  const [currentPid, setPid] = useState(pids[currentInput]);

  // const journal = useRef(null);
  //   const options = {
  //     root: journal.current,
  //     rootMargin: "0px",
  //     threshhold: 1,
  //   };
  // function useOnPageChange(options){

  //   const [currentVisible, setCurrentVisible] = useState(pages[0])

  //   useEffect(()=> {
  //     const observer = new IntersectionObserver((entries =>{
  //       entries.some(entry =>{
  //         if(entry.isIntersecting){
  //           setCurrentVisible(entry.target)
  //           return;
  //         }
  //       })
  //     }), options);

  //     for (let index = 0; index < pages.length; index++) {
  //       observer.observe(pages[index]);
  //     }

  //     return () => {
  //       for (let index = 0; index < pages.length; index++) {
  //         observer.unobserve(pages[index]);
  //       }
  //     };

  //   }, [...pages, options])

  //   return currentVisible
  // }

  // const visibleEl = useOnPageChange(options)
  // console.log(visibleEl);

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
    scroll(pids[i]);
    setPid(pids[i]);
  }
  function getPrevImage() {
    let i = pids.indexOf(currentPid) - 1;
    console.log(i, pids[i]);
    scroll(pids[i]);
    setPid(pids[i]);
  }

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
          {/* <h1>
            {inputProps.currentPid}: which is{" "}
            {inputProps.currentPid.slice(-2)} of {pages.length}{" "}
          </h1> */}
          <input onChange={onChange} placeholder={""} />
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
          <div id="journal">
            {props.children}
          </div>
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
