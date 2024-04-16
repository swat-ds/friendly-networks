import React, { useEffect } from "react";
import {useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { SEO } from "../components/SEO";
import JournalCard from "../components/JournalCard";
import { Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "../styles/pageStyles.scss"
import { filter } from "d3";

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
    ][0]._.split(":")[0].split(/, (?=\d|undated)/)[1];
  
  // Extract collection title from TEI
  let collection = xpath.evalFirst(header, "//tei-collection")["_"]

  // Extract genre from TEI
  let genre
  if (title.toLowerCase().includes("journal")){
    genre = "Journals";
  } else if (title.toLowerCase().includes("account")){
    genre = "Account Books"
  } else {
    genre = "Letters"
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

// Create a useState to filter which genres are shown
const [genreFilter, setGenre] = useState('');
const genres = [
  {name: 'All', value: ''},
  {name: 'Journals', value: 'journal'},
  {name: 'Letters', value: 'letter'},
  {name: 'Accounts', value: 'account'}
];

  var filteredNodes;
  filteredNodes = preparedNodes.filter(x => x.collection.includes(collFilter))
  filteredNodes = filteredNodes.filter(x => x.title.toLowerCase().includes(genreFilter))

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
         The journals of John Hunt and Joshua Evans are valuable sources for 
          Quaker history in the late eighteenth and early nineteenth centuries.
          Hunt’s journals focus on his daily life in Burlington County, New 
          Jersey, and cover over 50 years, from 1770 to Hunt’s death in 1824 
          (though little material has survived from 1800 to 1812).
          Evans’s journals begin with an autobiography and go on to detail 
          his religious travels from Nova Scotia to Georgia in the 1790s.
          Both men’s journals document their advocacy for non-violence, the 
          abolition of slavery, and the fair treatment of Native Americans 
          and African Americans.
         </p>
         <p>
            Click on a journal card to browse images and transcripts of that 
            journal.
            Use the "Hunt" and "Evans" buttons 
            {filterOnSide ?" on the right ":" above the cards "}
            to filter which journals cards are displayed, or click "All" to 
            view all cards.
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

            {/* Genres */}
            <div className="filter-label h6">Filter by genre</div>
            <ToggleButtonGroup 
              name="genre" 
              type="radio"
              defaultValue={''}
              id="journal-filter-group"
              vertical={filterOnSide}
            >
              {genres.map((genre, idx) => (
                <ToggleButton
                  className="journal-toggle-btn"
                  key={idx}
                  id={`genre-${idx}`}
                  type="radio"
                  variant="primary"
                  name="genre"
                  value={genre.value}
                  checked={genreFilter === genres.value}
                  onChange={(e) => setGenre(e.currentTarget.value)}
                >
                  {genre.name}
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
