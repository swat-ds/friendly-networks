import React from "react";
import { Link, graphql } from "gatsby";
import Fuse from "fuse.js";
import Layout from "../components/Layout";
import { Card, Row, Col, Tab, Tabs, Badge } from "react-bootstrap";

import "../styles/styles.scss";

const parseString = require("xml2js").parseString;

function getHighlightedText(text, highlight) {
  // Split text on highlight term, include term itself into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark>{part}</mark>
        ) : (
          part
        )
      )}
    </span>
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
      console.log("root", doc.documentElement);
      const rawDivs = Array.from(doc.querySelectorAll("tei-div"))
      const divs = rawDivs.map(div => { return{
        text: div.textContent,
        name: journal.parent.name,
        id: div.attributes?.n?.nodeValue
      }});
      divs.forEach(div => parsedJournals.push(div));
    });

    console.log("location", location);

    if (location.state !== null) {
      query = location.state.searchQuery;
    } else {
      query = location.search.slice(3);
    }
    const journalFuse = new Fuse(parsedJournals, {
      includeMatches: true,
      includeScore: true,
      minMatchCharLength: query.length,
      keys: ["text"],
    });

    let jFuseResult = journalFuse.search(query);
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
    return (
          <Link to={"/" + result.item.name} className="result-link">
            <Card bg="primary" className="result-card">
              <Card.Header>Journal Result</Card.Header>
              <Card.Body>
                <Card.Text>
                  {getHighlightedText(result.matches[0].value, query)}
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
                  {getHighlightedText(result.matches[0].value, query)}
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
          {constellationResult.length + journalResult.length} results for "{query}
          "
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
