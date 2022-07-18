import React from "react";
import { Link, graphql } from "gatsby";
import Fuse from "fuse.js";
import Layout from "../components/Layout";
import { Card, Row, Col } from "react-bootstrap";

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

  data.journals.nodes.forEach((journal) => {
    //  let headBegin = journal.prefixed.indexOf("<body");
    //  let headEndStr = "</body>";
    //  let headEnd = journal.prefixed.indexOf("</body>");
    //  let teiHeaderBody = journal.prefixed.substring(
    //    headBegin,
    //    headEnd + headEndStr.length
    //  );
    parseString(journal.prefixed, function (err, result) {
      //  console.log(journal.prefixed)
      //  console.log(result)
      let entry = {
        text: result,
        name: journal.parent.name,
      };
      parsedJournals.push(entry);
    });
  });

  let constellationResult = [];
  let journalResult = [];
  let query = "";

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    console.log(location);

    if (location.state !== null) {
      query = location.state.searchQuery;
    } else {
      query = location.search.slice(3);
    }
    let baseKey = "text.tei-TEI.tei-text.tei-body.tei-div";
    const journalFuse = new Fuse(parsedJournals, {
      includeMatches: true,
      includeScore: true,
      minMatchCharLength: query.length,
      keys: [
        // `${baseKey}.tei-dateline`,
        // `${baseKey}.tei-head`,
        `${baseKey}.tei-p._`,
        `${baseKey}.tei-p.tei-persName._`,
        `${baseKey}.tei-p.tei-rs._`,
        `${baseKey}.tei-head._`,
        `${baseKey}.tei-dateline.tei-date._`,
        // `${baseKey}.tei-p.tei-note._`,
        // `${baseKey}.tei-p.tei-note.tei-q._`,
      ],
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

  console.log(parsedJournals);
  console.log(journalResult);
  console.log(constellationResult);
  // console.log(parsedJournals)
  // function handleChange(e){
  //     e.preventDefault()
  //     setQuery(e.target.value)
  // }
  // function handleClick(){
  //     let resultData = query;
  //     setResult(resultData)
  // }

  // useEffect(() => {
  //     btnRef.current.click()
  // }, [])

  //  <span>{}</span>;
  //  {
  //    result.matches[0].value;
  //  }
  function renderJResult(result, index) {
    return (
      <Row>
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
    </Row>
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
        <Col>
          <h6 className="general-text">Journal Results</h6>
          {journalResult.map(renderJResult)}

          <h6 className="general-text">People Results</h6>
          {constellationResult.map(renderCResult)}
        </Col>
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
