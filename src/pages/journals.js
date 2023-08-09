import React, { useEffect } from "react";
import {useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { SEO } from "../components/SEO";
import JournalCard from "../components/JournalCard";
import { Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "../styles/pageStyles.scss"

const parseString = require("xml2js").parseString;
var xpath = require("xml2js-xpath");

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
  
  // Extract collection title from TEI
  let collection = xpath.evalFirst(header, "//tei-collection")["_"]

  let preparedNode = {
    route: route ,
    title: title,
    detailedDateStr: detailedDateStr,
    collection: collection,
  };

  return preparedNode;
}

const JournalsPage = ({ data }) => {
  // Extract metadata from TEI files returned by graphQL
  const nodes = data.allCetei.nodes;
  const preparedNodes = nodes.map(node => prepareNode(node))
  
  
  // Sort documents by date
  preparedNodes.sort((a, b)=>{
    return a.detailedDateStr > b.detailedDateStr ? 1 : -1;
  })
  
  // Create a useState to filter which collections are shown
  const [collFilter, setColl] = useState('');
  const collections = [
    {name: 'All', value: ''},
    {name: 'Hunt', value: 'Hunt'},
    {name: 'Evans', value: 'Evans'}
  ];

  var filteredNodes;
  filteredNodes = preparedNodes.filter(x => x.collection.includes(collFilter))

  // Handle display of filter buttons: 
  const minWidth = 992;
  const [filterOnSide, setFilterOnSide] = useState(true)
  useEffect(() => { // Check size of window on component load
    if (window && window.innerWidth < minWidth) {
      setFilterOnSide(false)
    }
    else if (window && window.innerWidth >= minWidth) {
      setFilterOnSide(true)
    }
  }, [])
  useEffect(() => {   // Keep track of window resize
    const handleResize = () => {
      if (window && window.innerWidth < minWidth) {
        setFilterOnSide(false)
      }
      else if (window && window.innerWidth >= minWidth) {
        setFilterOnSide(true)
      }
    };
    if (window) {
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      };
    }
  }, [])

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
       <Row id="main-row"><Col>
         <h1>Journals</h1>
         <p>
            Click on a journal card to browse images and transcripts of that journal.
        </p>
        <Row style={{"flexWrap": "wrap-reverse", "alignItems": "start"}}>
            <Col id="journal-card-col">
              <Row xs={2} md={3} lg={4} xl={5} xxl={6} id="journal-card-row">
                  {filteredNodes.map(renderJournals)}
              </Row>
            </Col>
          <Col id="journal-filter-col" sm={12} lg={1}>
            <div className="filter-label h6">Filter by collection</div>
            <ToggleButtonGroup 
              name="collection" 
              type="radio"
              defaultValue={''}
              id="journal-filter-group"
              vertical={filterOnSide}
            >
              {collections.map((collection, idx) => (
                <ToggleButton
                  className="journal-toggle-btn"
                  key={idx}
                  id={`collection-${idx}`}
                  type="radio"
                  variant="primary"
                  name="collection"
                  value={collection.value}
                  checked={collFilter === collection.value}
                  onChange={(e) => setColl(e.currentTarget.value)}
                >
                  {collection.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Col>
        </Row>  
      </Col></Row>
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

export default JournalsPage;
