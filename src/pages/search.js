import React from "react";
import { Link, graphql } from "gatsby";
import Fuse from "fuse.js";
import Layout from "../components/Layout";
import { SEO } from "../components/SEO";
import { Card, Row, Col, Tab, Tabs, Badge } from "react-bootstrap";

import "../styles/styles.scss";

const parseString = require("xml2js").parseString;

function formatSearchResult(result, query) {

  // Format using query string if it is present in the matched text
  if (result.matches[0].value.includes(query)) {
    const parts = result.matches[0].value.split(RegExp("("+query+")"));
    // Replace stray XML tags
    parts.forEach((item, i) => {
      parts[i] = item.replaceAll(/<[^>]*>/g, "")
    });

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
  const text = result.matches[0].value.replaceAll(/<[^>]*>/g, "") // Remove any stray XML tags
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
  let parsedDocs = [];


  let constellationResult = [];
  let DocResult = [];
  let query = "";

  if (typeof window !== "undefined" && typeof document !== "undefined") {

    data.writings.nodes.forEach((doc) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(doc.prefixed, "text/xml");
      const title = xml.querySelector("tei-fileDesc tei-title").innerHTML;
      const rawDivs = Array.from(xml.querySelectorAll("tei-div"))
      const divs = rawDivs.map(div => { return{
        text: div.textContent,
        name: doc.parent.name,
        id: div.attributes?.n?.nodeValue,
        title: title.split(":")[0]
      }});
      divs.forEach(div => parsedDocs.push(div));
    });

    // console.log("location", location);

    // Extract search query from passed URL/state
    if (location.state !== null) {
      query = location.state.searchQuery;
    } else {
      query = location.search.slice(3);
    }
    // Decode query (e.g., convert "%20" to a space char)
    query = decodeURI(query);

    // Search writings

    const wOptions = {
      includeMatches: true,
      includeScore: true,
      minMatchCharLength: query.length,
      ignoreLocation: true,
      ignoreFieldNorm:true,
      findAllMatches:true,
      threshhold: 0.001,
      keys: ["text"],
    }

    const docFuse = new Fuse(parsedDocs, wOptions);

    let wFuseResult = docFuse.search(query, 300);
    DocResult.push(...wFuseResult);

    // Filter bad matches from search results
    // (since apparently Fuse won't do this itself??)
    DocResult = DocResult.filter(result => result.score < 0.25)

    // Search constellations

    const cOptions = {
      includeMatches: true,
      includeScore: true,
      minMatchCharLength: query.length,
      ignoreLocation: true,
      findAllMatches:true,
      threshhold: 0.05,
      keys: [
        "nameEntries.original",
        "biogHists.text",
        "occupations.term.term",
        "places.original",
        "subjects.term.term",
      ],
    }


    const constellationFuse = new Fuse(data.constellations.nodes, cOptions);

    let cFuseResult = constellationFuse.search(query);
    constellationResult.push(...cFuseResult);

    // Filter bad matches from search results
    // (since apparently Fuse won't do this itself??)
    constellationResult = constellationResult.filter(result => result.score < 0.7)
  }

  // console.log("parsedDocs", parsedDocs);
  // console.log("DocResult", DocResult);
  // console.log("constellationResult", constellationResult);

  function renderJResult(result, index) {
    // Generate an anchor link for the div if it has an identifier
    const hash = result.item.id ? "#" + result.item.id : "";

    return (
          <Link to={"/writings/" + result.item.name + hash} className="result-link">
            <Card bg="primary" className="result-card">
              <Card.Header>
                <Card.Title>{result.item.title}</Card.Title>
                <Card.Subtitle>{result.item.id}</Card.Subtitle>
              </Card.Header>
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
    // Extract entity name to display in title
    let name, date = ""
    if ("nameEntries" in result.item) {
      let entries = result.item.nameEntries[0].original.split(",");
      if (result.item.entityType.term === "person") {
        date = entries.pop();
        name = entries.join(",");
      } else {
        name = "Corporate Body";
        date = ""
      }
    }
    return (
      <Row>
          <Link to={"/people/" + result.item.arkId} className="result-link">
            <Card bg="primary" className="result-card">
              <Card.Header>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>{date}</Card.Subtitle>
              </Card.Header>
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
          {constellationResult.length+DocResult.length} results for "{query}"
        </h4>

        <br />
        <Tabs>
          <Tab eventKey="documents" title={
            <React.Fragment>
              Document Results
              <Badge pill bg='primary'>{DocResult.length}</Badge>
            </React.Fragment>
          }>
              {DocResult.map(renderJResult)}
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

// Enrich <head> tag
export const Head = () => (
  <SEO title="Search - Friendly Networks"/>
)

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
        subjects {
          term {
            term
          }
        }
      }
    }

    writings: allCetei {
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
