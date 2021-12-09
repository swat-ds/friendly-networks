import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import JournalCard from "../components/JournalCard";
import { Button, Card, Row, Col } from "react-bootstrap";
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

    let route = "/" + node.parent.name;

    let title =
      header["tei-teiHeader"]["tei-fileDesc"][0]["tei-titleStmt"][0][
        "tei-title"
      ][0]._.split(":")[0].split(",")[0] || "John Hunt Journal";

    // let date =
    //   header["tei-teiHeader"]["tei-profileDesc"][0]["tei-creation"][0][
    //     "tei-date"
    //   ][0]._.split("-") || "";

    let detailedDateStr =
      header["tei-teiHeader"]["tei-fileDesc"][0]["tei-titleStmt"][0][
        "tei-title"
      ][0]._.split(":")[0].split(",")[1];

    let detailedDate = detailedDateStr.split("-");
    let beginningDate = detailedDate[0].trim().split(/\s+/);
    let endingDate =
      detailedDate.length > 1 ? detailedDate[1].trim().split(/\s+/) : "";

    let beginningYear = beginningDate[0] != undefined ? beginningDate[0] : "";

    let beginningMonth = beginningDate[1] != undefined ? beginningDate[1] : "";
    beginningMonth =
      beginningMonth != undefined ? parseInt(beginningMonth.slice(0, -3)) : "";
    // beginningMonth = beginningMonth != ""? months[parseInt(beginningMonth)].abbr : "";
    let beginningDay = beginningDate[2] != undefined ? beginningDate[2] : "";

    let endingYear = endingDate[0] != undefined ? endingDate[0] : "";
    let endingMonth = endingDate[1] != undefined ? endingDate[1] : "";
    endingMonth = endingMonth != undefined ? endingMonth.slice(0, -3) : "";
    let endingDay = endingDate[2] != undefined ? endingDate[2] : "";

    let text =
      header["tei-teiHeader"]["tei-fileDesc"][0]["tei-seriesStmt"][0][
        "tei-title"
      ][0]["tei-title"][1]._ || "";


    let preparedNode = {
      route: route ,
      title: title ,
      startMonth: beginningMonth ,
      startDay: beginningDay,
      startYear: beginningYear,

      endMonth: endingMonth ,
      endDay: endingDay ,
      endYear: endingYear ,

      description: text,
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
      <Col style={{ border: "0.1px solid gray" }}>
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
       <Row md={4} id="main-row">
         {preparedNodes.map(renderJournals)}
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
