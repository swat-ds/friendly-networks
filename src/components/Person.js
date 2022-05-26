//Package imports
import React from "react";
import {graphql, Link} from "gatsby";
import { Row, Col, Card, Accordion, Badge } from "react-bootstrap";
//Local imports
import Layout from "./Layout";
import RelationCardDeck from "./RelationCardDeck";
import { months } from "../globalVariables.js";
import "../styles/entity.scss";

const parseString = require("xml2js").parseString;

//Modify any of these properties to alter the naming of the labels.
const bioDataLabels = {
  id: "",
  ark: "",
  nameEntries: "Other Names",
  entityType: "",
  biogHists: "",
  dates: "Dates",
  places: "Related Places",
  occupations: "Occupations",
  subjects: "Subjects",
  relations: "Relatives and acquaintances",
  genders: "Gender",
  sameAsRelations: "Authority records",
};

/**
 * @param isoString a date string in ISO format (yyyy-MM-dd)
 * @returns a string in the format January 1, 1794
*/
function formatDate(isoString) {
  const date = new Date(isoString+"T00:00:00Z");
  const month = months[date.getUTCMonth()]?.abbr;
  const day = date.getUTCDate().toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`
}

/**
 *
 * @param {*} props properties for this component, including the data comping from Page Creation of
 * gatsby-node.js. This component has been passed for those page creations
 * @returns the page for each entity with curated data
 */
const Person = (props) => {
  const {
    id,
    arkId,
    nameEntries,
    entityType,
    biogHists,
    dates,
    places,
    occupations,
    subjects,
    relations,
    genders,
    sameAsRelations,
    allArks,
    arkRegex,
  } = props.pageContext;

  // Initialize empty arrays to hold mentions
  const [huntDated, huntUndated, evansDated, evansUndated] = [[],[],[],[]]

  function processTei (teiDoc) {
    // Parse tei
    const parser = new DOMParser();
    const doc = parser.parseFromString(teiDoc.prefixed, "text/xml");

    // Get journal title
    const title = doc.querySelector("tei-title").textContent.split(":")[0];

    // Get journal start date
    const startNode = doc.querySelector("tei-profileDesc tei-date")
    const start = startNode.hasAttribute("from")
      ? startNode.getAttribute("from")
      : startNode.getAttribute("when");

    // Get mentions
    const mentions = Array.from(
      doc.documentElement.querySelectorAll(`[key="${arkId}"]`)
    );

    mentions.forEach(el => {
      // Get value of @n of enclosing <div>, if there is a <div> w/ @n
      // (if @n exists, its value is an ISO-formatted date (yyyy-MM-dd))
      const date = el.closest("tei-div[n]")?.getAttribute("n").split("/")[0]

      // -------- Handle mentions in dated entries --------
      if (date) {
        // Create an object containing the date and a link to the entry
        const entryObj = {
          entryDate: date,
          href: `/journals/${teiDoc.parent.name}#${date}`
        };

        // Check journal title and add object to appropriate array
        if (title.includes("Hunt")) {huntDated.push(entryObj)}
        if (title.includes("Evans")) {evansDated.push(entryObj)}

      // -------- Handle mentions not in dated entries --------
      } else {
        // ---- Determine page number (by finding previous <tei-pb>) ----

        // Replace contents of mention with a unique search target
        el.innerHTML = "TEFLON TELEPHONE"

        // Walk back & up through DOM, running regEx search till it matches
        var currEl = el.parentElement;
        while (! currEl.innerHTML.match(/<tei-pb.+TEFLON TELEPHONE/s)) {
          // Set currEl to prev sibling if one exists, else to parent
          currEl = currEl.previousElementSibling || currEl.parentElement;
        }
        // Get index of start of mention w/in innerHTML

        // Trim innerHTML str to start of mention

        // Find last <tei-pb> w/in trimmed innerHTML

      }
    })

    // Map mentions to entries containing mentions
    const entries = mentions.map(
      el => el.closest("tei-div[n]")?.getAttribute("n").split("/")[0]
    ).filter(
      el => el // Remove nulls
    ).filter(
      (item, index, self) => self.indexOf(item) === index // Remove dups
    );

    if (entries.length > 0) {
      return {
        title: title,
        date: start,
        mentions: entries.map(entryDate => ({
          isoString: entryDate,
          link: `/journals/${teiDoc.parent.name}#${entryDate}`,
          dateString: formatDate(entryDate)
        }))
      };
    }
    return null;
  };


  /**
   * Extracts the bio of the @biogHist and renders it
   * @returns an article containing the biography of each entity
   */
  const renderBio = () => {
    if (biogHists) {
      let text = [];
      let citation = [];
      let wrappedBio = `<bio>${biogHists[0].text}</bio>`;

      parseString(wrappedBio, function (err, result) {
        let bio = result?.bio || null;
        // console.log(result.bio.biogHist[0].p[0]._);
        // text = result.bio.biogHist[0].p[0]._;
        if (bio !== null) {
          if (bio.biogHist) {
            if (bio.biogHist[0].p) {
              for (let p of bio.biogHist[0].p) {
                if (p._) {
                  text.push(p._);
                } else {
                  text.push(p);
                }
              }
            }

            if (bio.biogHist[0].citation) {
              for (const cite of bio.biogHist[0].citation) {
                citation.push(cite._);
              }
            }

          }
          if (bio.p) {
            for (let p of bio.p) {
              if (p._) {
                text.push(p._);
              } else {
                text.push(p);
              }
            }

          }
          if (bio.citation) {
            for (const cite of bio.citation) {
              if (cite._) {
                citation.push(cite._);
              } else {
                citation.push(cite);
              }
            }
          }

          if (!bio.citation && !bio.p && !bio.biogHist && bio !== "") {
            text.push(bio);
          }
        }
      });

      //Assume all the text and/or citation has been extracted if exist
      return (
        <article id="biography">
          {text.map((part) => (
            <p>{part}</p>
          ))}
          <footer>
            {citation.map((cite) => (
              <p><small>{cite}</small></p>
            ))}
          </footer>
        </article>
      );
    }
  };

  /**
   *
   * @param {*} entity the entity whose alternatives names to be rendered
   * @param {*} _ ignored the index
   * @returns A list element containing the a single alternative name
   */
  function renderNameVariant(entity, _) {
    if (entity.original && entity.original !== nameEntries[0].original) {
      const pieces = entity.original.split(",");
      const names = pieces.filter(
        (dep, index) => index !== pieces.length - 1 && dep
      );
      return names.length > 0 ? (
        <li>{`${names.join()}`}</li>
      ) : null;
    }
  }

  /**
   * @returns An unordered list containing all the alternative names
   */
  const renderNameVariants = () => {
    if (nameEntries.length > 1) {
      return (
        <div>
          <h5>{`${bioDataLabels.nameEntries}`}</h5>
          <ul>{nameEntries.map(renderNameVariant)}</ul>
        </div>
      );
    } else {
      return;
    }
  };

  const renderBirth = () => {

    // Check if birthdate present; assign if found
    const dateString = dates && dates[0]?.fromType?.term === "Birth"
        ? dates[0].fromDate
        : null;

    const placeIndex = places?.findIndex((x) => x?.role?.term === "Birth");
    const placeSpan = placeIndex && (placeIndex > -1)
        ? renderPlace(places[placeIndex]).props.children
        : null;

    var birthSpan;
    if (!(dateString || placeSpan)) {
        birthSpan = "Date uncertain";
    }
    else if (dateString && placeSpan) {
        birthSpan = [(<>{dateString}<br/></>), placeSpan];
    }
    else {
        birthSpan = dateString
            ? (<>{dateString}</>)
            : [<>Date uncertain<br/></>,placeSpan];
    }
    return (
        <div>
          <h5>Birth</h5>
          <ul style={{ listStyleType: "none" }}><li>{birthSpan}</li></ul>
        </div>);
  };

  const renderDeath = () => {
      // Check if deathdate present; assign if found
      const dateString = dates
        && (dates[0]?.toType?.term || dates[0]?.fromType?.term) === "Death"
          ? dates[0].toDate || dates[0].fromDate
          : null;

      const placeIndex = places?.findIndex((x) => x?.role?.term === "Death");
      const placeSpan = (placeIndex && placeIndex > -1)
          ? renderPlace(places[placeIndex]).props.children
          : null;

      var deathSpan;
      if (!(dateString || placeSpan)) {
          deathSpan = "Date uncertain";
      }
      else if (dateString && placeSpan) {
          deathSpan = [(<>{dateString}<br/></>), placeSpan];
      }
      else {
          deathSpan = dateString
              ? (<>{dateString}</>)
              : [<>Date uncertain<br/></>,placeSpan];
      }
      return (
          <div>
            <h5>Death</h5>
            <ul style={{ listStyleType: "none" }}><li>{deathSpan}</li></ul>
          </div>);
};

  /**
   * Extracts the data from the @dates object
   * @returns The birth and decease death of the current entity
   */
  /* const renderDates = () => {
  //   // Case where we have two or more date objects
  //   if (dates.length > 1) {
  //     return (
  //       <div>
  //         <h5>{`${bioDataLabels.dates}`}</h5>
  //         <ul style={{ listStyleType: "none" }}>
  //           <li>{`Birth: ${dates[0].fromDate}`}</li>
  //           <li>{`death: ${dates[1].toDate}`}</li>
  //         </ul>
  //       </div>
  //     );
  //
  //    // Case where we only have one date
  //   } else {
  //     return (
  //       <div>
  //         <h5>{`${bioDataLabels.dates}`}</h5>
  //         <ul style={{ listStyleType: "none" }}>
  //           <li>{`Birth: ${dates[0].fromDate}`}</li>
  //           <li>{`Death: ${dates[0].toDate}`}</li>
  //         </ul>
  //       </div>
  //     );
  //   }
  // };
  //
  // /**
  //  * renders a single place of the @places visited by the current entity
  //  * @param {*} place the place to be rendered
  //  * @param {*} _ the index is ignored
  //  * @returns returns a single place name in the form of city/town, state, country
  //  */

  const renderPlace = (place, _) => {
    if (place) {
      let placeName = place.geoplace?.name ? place.geoplace.name : null;
      let country = place.geoplace?.countryCode
        ? place.geoplace.countryCode
        : null;
      let state = place.geoplace?.administrationCode
        ? place.geoplace.administrationCode
        : null;
      let map = place.geoplace?.uri ? place.geoplace.uri : null;

      if (placeName && state && country) {
        if (map) {
          return (
            <li>
              <span>{`${placeName}, ${state}, ${country}  `}</span>
              <span>{map ? <a href={map}>map</a> : ""}</span>
            </li>
          );
        } else {
          return <li>{`${placeName}, ${state}, ${country}  `}</li>;
        }
      } else {
        return;
      }
    } else {
      return;
    }
  };

  /**
   * renders all the places from the @places visited by the current entity
   * @returns returns all places' name in the form of city/town, state, country
   */
  const renderPlaces = () => {
    if (places) {
        // Screen out birth and death places (already displayed elsewhere)
        var placesToDisplay = [];
        places.forEach((place) => {
            if (! ["Birth", "Death"].includes(place?.role?.term)) {
                placesToDisplay.push(place)
            }
        });

      return (
        <div>
          <h5>{`${bioDataLabels.places}`}</h5>
          <ul>{placesToDisplay.map(renderPlace)}</ul>
        </div>
      );
    }
  };


  /**
   * renders a single occupation from the @occupations done by the current entity
   * @param {*} occupation the occupation to be rendered
   * @param {*} _ the index is ignored
   * @returns the @occupation
   */
  const renderOccupation = (occupation, _) => {
    if (occupation) {
      let occupationName = occupation.term?.term ? occupation.term.term : null;
      if (occupationName) {
        return (
          <li>
            {occupationName}
          </li>
        );
      }
    }
  };
  /**
   * renders all the occupations from the @occupations done by the current entity
   * @returns all the occupations
   */
  const renderOccupations = () => {
    if (occupations) {
      return (
        <div>
          <h5>{`${bioDataLabels.occupations}`}</h5>
          <ul>{occupations.map(renderOccupation)}</ul>
        </div>
      );
    }
  };

  /**
   * Render a single subject from the @subjects
   * @param {*} subject the subject to be rendered
   * @param {*} _ the index is ignored
   * @returns the @subject
   */
  const renderSubject = (subject, _) => {
    if (subject) {
      let subjectName = subject.term?.term ? subject.term.term : null;
      if (subjectName) {
        return <li>{subjectName}</li>;
      }
    }
  };
  /**
   * Render all the subjects from the @subjects
   * @returns all the subjects
   */
  const renderSubjects = () => {
    if (subjects) {
      return (
        <div>
          <h5>{`${bioDataLabels.subjects}`}</h5>
          <ul>{subjects.map(renderSubject)}</ul>
         </div>

      );
    }
  };

  /**
   * Render a single sameAsRelation uri from the @sameAsRelations
   * @param {*} sameAsRelation the sameAsRelation to be returned
   * @param {*} _ the index is ignored
   * @returns a uri of the sameAsRelation
   */
  const renderSameAsRelation = (sameAsRelation, _) => {
    if (sameAsRelation) {
      let sameAsRelationName = sameAsRelation.uri ? sameAsRelation.uri : null;
      if (sameAsRelationName) {
        return (
          <li>
            <a href={sameAsRelationName} className="g-link ">
              {sameAsRelationName}
            </a>
          </li>
        );
      }
    }
  };

  /**
   * Render a single relation from the @relations with the component of RelativeCard
   * @param {*} relation the relation to be rendered
   * @param {*} _ the index is ignored
   * @returns the relation from the @relations with the component of RelativeCard
   */
  const renderRelatives = () => {
    let existentRelations = [];
    for (let r of relations) {
      let arkId = r.targetArkID.split("/").pop();
      if (allArks.includes(arkId)) {
        existentRelations.push(r);
      }
    }
    if (existentRelations.length > 0) {
      return (
        <RelationCardDeck relationDeck={existentRelations}></RelationCardDeck>
      );
    }
    return null;
  };

  /**
   * creates a paragraph @p containing the gender type of the entity
   * @returns the @p
   */
  const renderGender = () => {
    if (genders) {
      let label = genders[0].term.term;
      return (
        <div>
          <h5>{`Gender`}</h5>
          <ul style={{ listStyleType: "none" }}>{label}</ul>
        </div>);
    }
  };

  const renderRelText = text => {
    if (! text) {return "";} // Return empty string if passed a falsy arg
    return (
      <Accordion flush>
        <Accordion.Item eventKey="{text.date}">
          <Accordion.Header>
            {text.title}
            <Badge bg="secondary" pill>{text.mentions.length}</Badge>
          </Accordion.Header>
          <Accordion.Body as="ul" style={{ listStyleType: "none" }}>
            {text.mentions.map(x=>
              <li>
                <Link to={x.link} class="g-link">{x.dateString}</Link>
              </li>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }

  const renderRelTexts = () => {
    const mentionTexts = props.data.allCetei.nodes.map(processTei).sort(
      (a, b) => (a?.date < b?.date) ? -1 : 1 // sort journals by date
    );
    console.log(mentionTexts);

      return (<>
        <h5>Mentioned in</h5>
        {mentionTexts.length > 0
          ? <Col>{mentionTexts.map(renderRelText)}</Col>
          : <p id="no-mentions">No mentions found</p>
        }
      </>)
  }

  return(
    <Layout>
      <Row id="titleRow" style={{justifyContent:"center"}}>
        <h1 style={{textAlign:"center"}}>{nameEntries[0].original}</h1>
      </Row>
      <Row id="person-main-row">
        <Col id="person-col-left">
          <Card bg="primary">
            <Card.Body>
              <Card.Title as="h2">Details</Card.Title>
              <Card.Text as="div">
                {renderBirth()}
                {renderDeath()}
                {renderGender()}
                {renderNameVariants()}
                {renderPlaces()}
                {renderOccupations()}
                {renderSubjects()}
              </Card.Text>
              <Card.Link
                href={"https://snaccooperative.org/view/" + id}
                target="_blank"
              >
                SNAC Record
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col id="person-col-center">
          <Row id="bio-row">
            <Card bg="primary">
              <Card.Body>
                <Card.Title as="h2">Biography</Card.Title>
                <Card.Text>
                  {renderBio()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
          <Row id="relations-row">
            <Card bg="primary">
              <Card.Body>
                <Card.Title as="h2">Relatives & Acquaintances</Card.Title>
                  {renderRelatives()}
                  <Card.Text>
                    <small>Only relationships to other people within <cite>Friendly Networks</cite> are listed.</small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </Col>
        <Col id="person-col-right">
          <Card bg="primary"><Card.Body>
            <Card.Title as="h2">Related Texts</Card.Title>
            {renderRelTexts()}
          </Card.Body></Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default Person;

export const query = graphql`
  query Tei($arkRegex: String) {
    allCetei(filter: {prefixed: {regex: $arkRegex}}) {
      nodes {
        id
        prefixed
        parent {
          ... on File {
            name
          }
        }
      }
    }
  }
`;
