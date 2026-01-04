import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";

import { Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

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

  let date

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
  
  // Create a useState to filter which collections are shown
  const [collFilter, setColl] = useState('');
  const collections = [
    {name: 'All', value: ''},
    {name: 'Hunt', value: 'John Hunt'},
    {name: 'Evans', value: 'Evans'},
    {name: 'Redman', value: 'Redman'},
    {name: 'Roberts', value: 'Roberts'},
    {name: 'Yarnall', value: 'Yarnall'},
  ];

// Create a useState to filter which genres are shown
const [genreFilter, setGenre] = useState('');
const genres = [
  {name: 'All', value: ''},
  {name: 'Journals', value: 'journal'},
  {name: 'Letters', value: 'letter'}
];

const [yearFilter, setYear] = useState([''], [''])

  var filteredNodes;
  filteredNodes = preparedNodes.filter(x => x.collection.includes(collFilter))
  filteredNodes = filteredNodes.filter(x => x.genre.toLowerCase().includes(genreFilter))

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
      <Col className="document-card-col">
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
         <h1>Writings</h1>
         <p>
            The writings of John Hunt and Joshua Evans are valuable sources for 
            Quaker history in the late eighteenth and early nineteenth centuries.
            Hunt’s journals focus on his daily life in Burlington County, New 
            Jersey, and cover over 50 years, from 1770 to Hunt’s death in 1824 
            (though little material has survived from 1800 to 1812).
            Evans’s journals begin with an autobiography and go on to detail 
            his <Link to='/maps'>religious travels</Link> as far as Nova Scotia 
            and Georgia in the 1790s.
            Both men’s journals document their advocacy for non-violence, the 
            abolition of slavery, and the fair treatment of Native Americans 
            and African Americans.
         </p>
         <p>
            Several other sets of documents help contextualize these journals. 
            First, letters to and from Hunt, Evans, and their families  
            illustratethe beliefs of other Friends in their network and their  
            reactions to Hunt and Evans’s ministries. 
            Next, Hunt’s account book provides more evidence for his economic 
            life as a rural joiner and his financial relationships with many of 
            the neighbors discussed in his journals. 
            Finally, journals and correspondence from several women ministers 
            in Hunt and Evans’s network—Mercy Redman, Esther Hunt Collins, 
            and Hannah Thornton Yarnall—offer a female perspective on Quaker 
            life in southern New Jersey and beyond.
         </p>
         <p>
            Click on a document card to browse images and transcripts of that 
            document.
            Use the buttons under "Filter by collection" and "Filter by genre"
            {filterOnSide ?" on the right ":" above the cards "}
            to filter which document cards are displayed, or click "All" to 
            view all cards.
        </p>
        <Row style={{"flexWrap": "wrap-reverse", "alignItems": "start"}}>
            <Col id="document-card-col">
              <Row xs={2} md={3} lg={4} xl={5} xxl={6} id="document-card-row">
                  {filteredNodes.map(renderJournals)}
              </Row>
            </Col>
          <Col id="document-filter-col" sm={12} lg={1}>
            <div className="filter-label h6">Filter by collection</div>
            <ToggleButtonGroup 
              name="collection" 
              type="radio"
              defaultValue={''}
              id="document-filter-group"
              vertical={filterOnSide}
            >
              {collections.map((collection, idx) => (
                <ToggleButton
                  className="document-toggle-btn"
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
              id="document-filter-group"
              vertical={filterOnSide}
            >
              {genres.map((genre, idx) => (
                <ToggleButton
                  className="document-toggle-btn"
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
  <Seo title="Writings - Friendly Networks"/>
)

export default WritingsPage;
