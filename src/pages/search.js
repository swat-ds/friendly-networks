import React from "react";
import { Link, graphql } from "gatsby";
import Fuse from "fuse.js";
import Layout from "../components/Layout";
import { Card, Row, Col, Tab, Tabs, Badge } from "react-bootstrap";

import "../styles/styles.scss";

const parseString = require("xml2js").parseString;

function formatSearchResult(result, query) {
  // Format using query string if present in the matched text
  if (result.matches[0].value.includes(query)) {
    const parts = result.matches[0].value.split(RegExp("("+query+")"));
    return <>
      {parts.map( (item, index) => {
        if (index%2 === 0) {
          return item
        }
        return <mark>{item}</mark>
      })}
    </>

  }

  // Otherwise, format by the given indices
  // Unpack text of result along with indices of match
  const text = result.matches[0].value
  const start = result.matches[0].indices[0][0]
  const end = result.matches[0].indices[0][1]

  // Split text on match indices
  let [pre, match, post] = [
    text.slice(0, start), text.slice(start, end+1), text.slice(end+1)
  ];

  return (
    <>{pre}<mark>{match}</mark>{post}</>
  );
}

const search = ({ location, data }) => {
  let parsedJournals = [];


  let constellationResult = [];
  let journalResult = [];
  let query = "";

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    data.journals.nodes.forEach((journal) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(journal.prefixed, "text/xml");
      const rawDivs = Array.from(doc.querySelectorAll("tei-div"))
      const divs = rawDivs.map(div => { return{
        text: div.textContent,
        name: journal.parent.name,
        id: div.attributes?.n?.nodeValue
      }});
      divs.forEach(div => parsedJournals.push(div));
    });

    console.log("location", location);

    // Extract search query from passed URL/state
    if (location.state !== null) {
      query = location.state.searchQuery;
    } else {
      query = location.search.slice(3);
    }
    // Decode query (e.g., convert "%20" to a space char)
    query = decodeURI(query);

    const jOptions = {
      includeMatches: true,
      includeScore: true,
      minMatchCharLength: query.length,
      ignoreLocation: true,
      findAllMatches:true,
      threshhold: 0.4,
      keys: ["text"],
    }

    const journalFuse = new Fuse(parsedJournals, jOptions);

    let jFuseResult = journalFuse.search(query, 300);
    journalResult.push(...jFuseResult);

    const constellationFuse = new Fuse(data.constellations.nodes, {
      includeMatches: true,
      includeScore: true,
      minMatchCharLength: query.length,
      keys: [
        "nameEntries.original",
        "biogHists.text",
        "occupations.term.term",
        "places.original",
        "subjects.term.term",
      ],
    });

    let cFuseResult = constellationFuse.search(query);
    constellationResult.push(...cFuseResult);
  }

  // console.log("parsedJournals", parsedJournals);
  console.log("journalResult", journalResult);
  console.log("constellationResult", constellationResult);

  function renderJResult(result, index) {
    // Generate an anchor link for the div if it has an identifier
    const hash = result.item.id ? "#" + result.item.id : "";

    return (
          <Link to={"/journals/" + result.item.name + hash} className="result-link">
            <Card bg="primary" className="result-card">
              <Card.Header>Journal Result</Card.Header>
              <Card.Body>
                <Card.Text>
                  {formatSearchResult(result, query)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
    );
  }

  function renderCResult(result, index) {
    return (
      <Row>
          <Link to={"/people/" + result.item.arkId} className="result-link">
            <Card bg="primary" className="result-card">
              <Card.Header>Person Result</Card.Header>
              <Card.Body>
                <Card.Text>
                  {formatSearchResult(result, query)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
      </Row>
    );
  }
  return (
    <Layout>
      <Row id="main-row">

        <h4 className="general-text">
          {constellationResult.length+journalResult.length} results for "{query}"
        </h4>

        <br />
        <Tabs>
          <Tab eventKey="journal" title={
            <React.Fragment>
              Journal Results
              <Badge pill bg='primary'>{journalResult.length}</Badge>
            </React.Fragment>
          }>
              {journalResult.map(renderJResult)}
          </Tab>
          <Tab eventKey="people" title={
            <React.Fragment>
              Person Results
              <Badge pill bg='primary'>{constellationResult.length}</Badge>
            </React.Fragment>
          }>
            <Col>
              {constellationResult.map(renderCResult)}
            </Col>
          </Tab>
        </Tabs>
      </Row>
    </Layout>
  );
};

export default search;

export const query = graphql`
  query {
    constellations: allConstellation {
      nodes {
        id
        arkId
        nameEntries {
          original
          components {
            dataType
            id
            order
            text
            type {
              term
            }
          }
          id
        }
        occupations {
          term {
            term
          }
        }
        subjects {
          term {
            term
          }
        }
        entityType {
          term
        }
        biogHists {
          language {
            language {
              term
              description
            }
          }
          text
        }
        places {
          confirmed
          original
          note
          geoplace {
            administrationCode
            countryCode
            id
            latitude
            longitude
            name
            uri
          }
        }
        relations {
          sourceArkID
          targetArkID
          sourceConstellation
          targetConstellation

          type {
            term
          }
          content
          note
          id
        }
        sameAsRelations {
          uri
        }
        subjects {
          term {
            term
          }
        }
        genders {
          term {
            term
            type
          }
        }
        dates {
          fromDate
          fromDateOriginal
          toDate
          toDateOriginal
        }
      }
    }

    journals: allCetei {
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
