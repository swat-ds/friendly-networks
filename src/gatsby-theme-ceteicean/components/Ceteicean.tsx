import React from "react"
import {useState, useEffect } from 'react'
import Ceteicean from "gatsby-theme-ceteicean/src/components/Ceteicean"
import {Container, Row, Button, Col} from 'react-bootstrap'
import Image from '../../components/Image'
import Layout from "../../components/Layout";
import { graphql, Link } from "gatsby";

import * as El from "./Elements"
import '../../styles.scss'


let counter = 1;
let counter2 = 0;

const ShadowedCeteicean = ({pageContext, data}) => {
  // let pids  = El.Pids();
  // console.log(pids)

  const routes = {
    "tei-TEI": El.TEI,
    "tei-teiHeader": El.Header,
    "tei-text": El.Text,
    "tei-body": El.Body,
    "tei-pb": El.Pb,
    "tei-div": El.Entry,
    "tei-dateline": El.Dateline,
    "tei-date": El.EntryDate,
    "tei-p": El.Para,
    "tei-emph": El.Emph,
    "tei-floatingText": El.FloatingText,
    "tei-quote": El.Quote,
    "tei-l": El.I,
    "tei-figure": El.Figure,
    "tei-note": El.Note,
    "tei-table": El.Table,
    "tei-row": El.Row,
    "tei-cell": El.Cell,
    "tei-list": El.List,
    "tei-item": El.Item,
    "tei-label": El.Label,
    "tei-title": El.Title,
    "tei-said": El.Said,
  };

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(pageContext.prefixed, "text/xml");
  const pages = xmlDoc.getElementsByTagName("tei-pb");
  let pids = []
  for (let index = 0; index < pages.length; index++) {
    pids.push(pages[index].attributes.getNamedItem("facs").value);
  }
  // console.log(pids);
  // console.log(typeof pids[0])

  const [cetei, setCetei] = useState(data.allCetei.nodes[counter].parent.name);
  // console.log(data.allCetei.nodes);

  const [currentImage, setImage] = useState(pids[counter2])

  function getNextCetei(){
    //  console.log(counter);
      setCetei(data.allCetei.nodes[counter++].parent.name)
      // console.log(data.allCetei.nodes[counter].parent.name);
  }
    function getPrevCetei() {
      // console.log(counter);
      setCetei(data.allCetei.nodes[counter--].parent.name);
      // console.log(data.allCetei.nodes[counter].parent.name);
    }

    function getNextImage(){
      console.log(pids[counter2])
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
          <Button variant="outline-info" onClick={() => getNextImage()}>Next Page
          </Button>
        </Col>
      </Row>
      <Row>
        <Image pid={currentImage}></Image>
        <Col>
          <section>
            <Ceteicean pageContext={pageContext} routes={routes} />
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

}

export const query = graphql`
  {
    allCetei {
      totalCount
      nodes {
        parent {
          ... on File {
            id
            name
          }
        }
      }
    }
  }
`;

export default ShadowedCeteicean
