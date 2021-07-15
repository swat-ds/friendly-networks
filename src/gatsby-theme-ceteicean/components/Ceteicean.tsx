import React from "react"
import Ceteicean from "gatsby-theme-ceteicean/src/components/Ceteicean"
import {Container, Row, Button, Col} from 'react-bootstrap'
import Image from '../../components/Image'
import Layout from "../../components/Layout";

import * as El from "./Elements"
import '../../styles.scss'

const ShadowedCeteicean = ({pageContext}) => {
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
  console.log(pids)

  
  return (
    <Layout>
      <Row>
        <Col>Page Break Pagination</Col>
      </Row>
      <Row>
        <Image></Image>
        <Col>
          <section>
            <Ceteicean pageContext={pageContext} routes={routes} />
          </section>
        </Col>
      </Row>
      <Row>
        <Col>Journal File Pagination Pagination</Col>
      </Row>
    </Layout>
  );

}

export default ShadowedCeteicean
