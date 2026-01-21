import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";

import { Row, Col, Tab, Tabs, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import Layout from "../components/Layout";
import JournalCard from "../components/JournalCard";
import { Seo } from "../components/SEO";

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
  let route = "/writings/" + node.parent.name;
  
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
    ][0]._.split(":")[0].split(/, (?=\d|undated)/)[1];
  
  // Extract collection title from TEI
  let collection = xpath.evalFirst(header, "//tei-collection")["_"]

  // Extract genre from TEI
  let genre
  if (title.toLowerCase().includes("letter")){
    genre = "Letters";
  } else {
    genre = "Journals"
  }

  let preparedNode = {
    route: route ,
    title: title,
    detailedDateStr: detailedDateStr,
    collection: collection,
    genre: genre,
  };

  return preparedNode;
}

const WritingsPage = ({ data }) => {
  // Extract metadata from TEI files returned by graphQL
  const nodes = data.allCetei.nodes;
  const preparedNodes = nodes.map(node => prepareNode(node))
  
  
  // Sort documents by date
  preparedNodes.sort((a, b)=>{
    return a.detailedDateStr > b.detailedDateStr ? 1 : -1;
  })


  // Create a grid of journal cards
  const renderJournals = (node, index)=>{
    return (
      <Col className="document-card-col">
        <JournalCard
        node={node}
        index={index}
        size ={preparedNodes.length}
        ></JournalCard>
      </Col>
    );
  }

  // Information for displaying each set of documents
  const documentSets = [
    {
      name: "Hunt journals",
      collection: "John Hunt",
      genre: "journal",
      text: <>
        The 24 journals of minister <Link to="people/w6n9820p">John  
        Hunt</Link> are valuable sources for Quaker history in the late 
        eighteenth and early nineteenth centuries. They record over 50 years 
        of Hunt’s daily life in Burlington County, New Jersey (1770–1824, 
        though little material has survived from the period 1800–1812). The 
        journals document Hunt’s advocacy for non-violence, the abolition of 
        slavery, and the fair treatment of Native Americans and 
        African Americans.
      </>
    },
    {
      name: "Evans journals",
      collection: "Evans",
      genre: "journal",
      text: <>
        The three journals of Quaker minister <Link to="/people/w6c82qz0">Joshua 
        Evans</Link> begin with an autobiography and go on to detail  
        his <Link to='/maps'>religious travels</Link> as far as Nova Scotia 
        and Georgia in the 1790s. The journals document Evans’s advocacy for 
        non-violence, the abolition of slavery, and the fair treatment of 
        Native Americans and African Americans.
      </>
    },
    {
      name: "Hunt letters",
      collection: "John Hunt",
      genre: "letter",
      text: <>
        Ten letters to and from <Link to="people/w6n9820p">John  
        Hunt</Link> and others in his orbit illustrate the beliefs of other 
        Friends in the network and help contextualize his journals.
      </>
    },
    {
      name: "Evans letters",
      collection: "Evans",
      genre: "letter",
      text: <>
        These 29 letters to and from <Link to="/people/w6c82qz0">Joshua 
        Evans</Link> and his family, mostly sent to his wife while he  
        was <Link to='/maps'>traveling in the ministry</Link>, demonstrate the 
        reactions of other Friends to his ministry. 
      </>
    },
    {
      name: "Redman journal",
      collection: "Redman",
      genre: "",
      text: <>
        The journal of Quaker minister <Link to="/people/w6x098rs">Mercy 
        Redman</Link> documents her <Link to="/maps">journey</Link> to New
        York, Rhode Island, and Massachusetts, parts of which were undertaken 
        with <Link to="/people/w6wr0v4m">John Woolman</Link>. 
      </>
    },
    {
      name: "Collins letters",
      collection: "Roberts",
      genre: "",
      text: <>
        <Link to="/people/w6gj3q0h">Esther Roberts Hunt Collins</Link>, a 
        sister-in-law of John Hunt and elder of Redstone Meeting, was an early 
        Quaker settler in western Pennsylvania. Her  
        husband <Link to="/people/w6n05cnp">Joshua Hunt</Link> died shortly 
        after the family reached Redstone, and Esther Hunt spent the next 15
        years raising her six children alone. Her family’s 49 letters document 
        this period, as well as her return to New Jersey after  
        marrying <Link to="/people/w6165774">John Collins</Link> in 1807.
      </>
    },
    {
      name: "Yarnall items",
      collection: "Yarnall",
      genre: "",
      text: <>
        <Link to="/people/w6g77m31">Hannah Haines Thornton Yarnall</Link> was 
        a Quaker minister, the widow of 
        minister <Link to="/people/w6hf8m7k">Joseph Thornton</Link>, 
        and the second wife of 
        minister <Link to="/people/w6kx66c3">Peter Yarnall</Link>. 
        An 1803 journal documents her religious travels to visit Quakers in 
        Pelham and Newmarket, Ontario, Canada.  A set of 25 letters to and 
        from Yarnall’s family gives insight into their daily lives and 
        occasionally provides the perspectives of other ministers in their 
        network.
      </>
    },
    {
      name: "All",
      collection: "",
      genre: "",
      text: ""
    },
  ]

  return (
      <Layout>
       <Row id="main-row"><Col>
         <h1>Writings</h1>
         <p>
            To explore the writings of John Hunt, Joshua Evans, and their 
            peers, choose a set of documents using the tabs below. Click a 
            document's card to browse images and transcripts of that document. 
            Documents are listed in chronological order within each category.
         </p>
        
        <div id="tab-row"><Tabs id="document-tabs" fill>
          {documentSets.map(
            set => <Tab eventKey={set.name} title={set.name}>
              <p style={{textWrap: 'pretty'}}>{set.text}</p>
              <Col id="document-card-col">
                <Row xs={2} md={3} lg={4} xl={5} xxl={6} id="document-card-row">
                  {preparedNodes // Filter nodes and then render each one as card
                    .filter(x => x.genre.toLowerCase().includes(set.genre))
                    .filter(x => x.collection.includes(set.collection))
                    .map(renderJournals)}
                </Row>
              </Col>
            </Tab>
          )}
        </Tabs></div>
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
  <Seo title="Writings - Friendly Networks"/>
)

export default WritingsPage;
