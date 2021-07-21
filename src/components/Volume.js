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
// Creating a custom hook


const Volume = (props) => {
  function useInput(defaultValue, pages) {
    const [currentPage, setCurrentPage] = useState(defaultValue);
    function onChange(e) {
      e.preventDefault();
      // var pageNumber = e.target.value;
      console.log(pages[e.target.value - 1]);
      if (pages[e.target.value]) {
        setCurrentPage(
          pages[e.target.value - 1].attributes.getNamedItem("facs").value
        );
      }
    }
    return {
      currentPage,
      onChange,
    };
  }
  const { pageContext, data } = props;

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(pageContext.prefixed, "text/xml");
  const pages = xmlDoc.getElementsByTagName("tei-pb");

  let pids = [];
  for (let index = 0; index < pages.length; index++) {
    pids.push(pages[index].attributes.getNamedItem("facs").value);
  }
  console.log(pids);
   const inputProps = useInput(pids[0], pages);

  // useEffect(() => {
  //   const hrs = document.getElementsByTagName("hr");
  //   const section = document.getElementsByTagName("section");
  //   console.log(hrs);
  // }, []);

  const [cetei, setCetei] = useState(data.allCetei.nodes[counter].parent.name);
  // console.log(data.allCetei.nodes);

  const [currentImage, setImage] = useState(pids[counter2]);

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

  function getNextImage() {
    console.log(pids[counter2]);
    setImage(pids[counter2++]);
    ///Increment in
  }
  function getPrevImage() {
    console.log(pids[counter2]);
    setImage(pids[counter2--]);
  }

 

  function handleClick() {
    scroller.scrollTo(inputProps.currentPage, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      containerId: "journal",
    });
    setImage(inputProps.currentPage);
  }

  let imageId = currentImage;

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
            {inputProps.currentPage}: which is{" "}
            {inputProps.currentPage.slice(-2)} of {pages.length}{" "}
          </h1> */}
          <input {...inputProps} placeholder={inputProps.currentPage.value} />
          {/* <scrollLink to={inputProps.currentPage} spy={true} smooth={true}>
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
          <OpenSeadragonViewer imageId={imageId} />
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
