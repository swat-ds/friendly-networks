import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import JournalCard from "../components/JournalCard";
import { Row, Col } from "react-bootstrap";
import "../styles/pageStyles.scss"

const parseString = require("xml2js").parseString;

  function prepareNode(node){
    let header;
    //Variables to extract the header from the prefix
    let headBegin = node.prefixed.indexOf("<tei-teiHeader");
    let headEndStr = "</tei-teiHeader>";
    let headEnd = node.prefixed.indexOf("</tei-teiHeader>");
    let teiHeaderBody = node.prefixed.substring(
      headBegin,
      headEnd + headEndStr.length
    );
    parseString(teiHeaderBody, function (err, result) {
      header = result;
    });
    // console.log(header);

    let route = "/journals/" + node.parent.name;

    let title =
      header["tei-teiHeader"]["tei-fileDesc"][0]["tei-titleStmt"][0][
        "tei-title"
      ][0]._.split(":")[0];

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
  let preparedNodes = [];
  const nodes = data.allCetei.nodes;
  nodes.forEach(node => preparedNodes.push(prepareNode(node)))

  preparedNodes.sort((a, b)=>{
    return a.detailedDateStr > b.detailedDateStr ? 1 : -1;
  })

  // preparedNodes.forEach((node) => console.log(node.detailedDateStr));
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
         <Row xs={2} small={3} md={4} lg={5} xl={8} className="journal-card-row">
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

export default journals;
