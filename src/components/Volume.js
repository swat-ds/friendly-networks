import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import Image from "./Image";
import Layout from "./Layout";
import {Link } from "gatsby";

import "../styles.scss"

let counter = 1;
let counter2 = 0;


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

  return (
    <Layout>
      <Row>
        <Col>
          <Button variant="outline-info" onClick={() => getPrevImage()}>
            Previous Page
          </Button>
        </Col>
        <Col md={{ offset: 7 }}>
          <Button variant="outline-info" onClick={() => getNextImage()}>
            Next Page
          </Button>
        </Col>
      </Row>
      <Row>
        <Image pid={currentImage}></Image>
        <Col>
          <section>
              {props.children}
          </section>
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
