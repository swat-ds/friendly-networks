import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { SEO } from "../components/SEO";
import JournalCard from "../components/JournalCard";
import { Row, Col } from "react-bootstrap";
import "../styles/pageStyles.scss"

const parseString = require("xml2js").parseString;

// Extract relevant metadata from a TEI file
function prepareNode(node){
  // Extract the TEI header from the rest of the document
  let header;
  let headBegin = node.prefixed.indexOf("<tei-teiHeader");
  let headEndStr = "</tei-teiHeader>";
  let headEnd = node.prefixed.indexOf("</tei-teiHeader>");
  let teiHeaderBody = node.prefixed.substring(
    headBegin,
    headEnd + headEndStr.length
  );
  // Having isolated the TEI header, parse its XML
  parseString(teiHeaderBody, function (err, result) {
    header = result;
  });

  // Set the URL for this document
  let route = "/journals/" + node.parent.name;
  
  // Extract document title from TEI
  let title =
    header["tei-teiHeader"]["tei-fileDesc"][0]["tei-titleStmt"][0][
      "tei-title"
    ][0]._.split(":")[0];

  // Extract date string from TEI title
  // (assuming it comes between the only comma and the only colon)
  let detailedDateStr =
    header["tei-teiHeader"]["tei-fileDesc"][0]["tei-titleStmt"][0][
      "tei-title"
    ][0]._.split(":")[0].split(",")[1];
  
  let preparedNode = {
    route: route ,
    title: title,
    detailedDateStr: detailedDateStr
  };

  return preparedNode;
}

const journals = ({ data }) => {
  // Extract metadata from TEI files returned by graphQL
  let preparedNodes = [];
  const nodes = data.allCetei.nodes;
  nodes.forEach(node => preparedNodes.push(prepareNode(node)))

  // Sort documents by date
  preparedNodes.sort((a, b)=>{
    return a.detailedDateStr > b.detailedDateStr ? 1 : -1;
  })

  // Create a grid of journal cards
  const renderJournals = (node, index)=>{
    return (
      <Col className="journal-card-col">
        <JournalCard
        node={node}
        index={index}
        size ={preparedNodes.length}
        ></JournalCard>
      </Col>
    );
  }

  return (
      <Layout>
       <Row id="main-row">
         <h1>Journals</h1>
         <p>
            Click on a journal to browse page scans and transcripts from it.
        </p>
         <Row xs={2} md={3} lg={4} xl={5} xxl={6} className="journal-card-row">
            {preparedNodes.map(renderJournals)}
         </Row>
       </Row>
      </Layout>
  );
};

export const data = graphql`
  {
    allCetei {
      totalCount
      nodes {
        prefixed
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

// Enrich <head> tag
export const Head = () => (
  <SEO title="Journals - Friendly Networks"/>
)

export default journals;
