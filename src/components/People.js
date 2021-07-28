//Package imports
import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "gatsby";
//Local imports
import Layout from "./Layout";
import RelativeCard from "./RelativeCard";

import "../assets/styles/styles.scss";
import Fox from "../assets/images/george_fox.jpeg";

const People = (props) => {
  const { id, nameEntries,
    entityType, 
    biogHists, 
    dates, 
    places, 
    occupations, 
    subjects,
    relations,
    sameAsRelations } =
    props.pageContext;
  // const parser = new DOMParser();
  // const xmlDoc = parser.parseFromString(biogHists[0].text, "text/xml");
  // console.log(nameEntries)
  // const paragraphs =  xmlDoc.getElementsByTagName("p")
  // const citation = xmlDoc.getElementsByTagName("citation")
  // console.log(paragraphs)
  // console.log(citation);
  // console.log(nameEntries)

  const renderBio = () => {
    if (biogHists) {
      return (
        <article id="bio">
          {biogHists[0].text}
          <br />
          <br />
          <figcaption>
            <small>{/* {citation[0].innerHTML} */}</small>
          </figcaption>
        </article>
      );
    }
  };
  function renderNameVariant(entity, _) {
    if (entity.original && entity.original !== nameEntries[0].original) {
      const pieces = entity.original.split(",");
      const names = pieces.filter(
        (dep, index) => index !== pieces.length - 1 && dep
      );
      return <li>{` ${names.join()}; `}</li>;
    }
  }
  const renderNameVariants = () => {
    if (nameEntries.length > 1) {
      return (
        <h6>
          Name Variants:
          <ul>{nameEntries.map(renderNameVariant)}</ul>
        </h6>
      );
    } else {
      return;
    }
  };

  const renderDates = () => {
    if (dates.length > 1) {
      return (
        <h6>
          Exit Dates:
          <ul>
            <li>{`Born: ${dates[0].fromDate}`}</li>
            <li>{`Decease: ${dates[1].toDate}`}</li>
          </ul>
        </h6>
      );
    } else {
      return (
        <h6>
          Exit Dates:
          <ul>
            <li>{`Born: ${dates[0].fromDate}`}</li>
            <li>{`Decease: ${dates[0].toDate}`}</li>
          </ul>
        </h6>
      );
    }
  };

  const renderPlace = (place, index) => {
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
              {`${placeName},${state},${country}  `}
              <span>{map ? <a href={map}>map</a> : ""}</span>
            </li>
          );
        } else {
          return <li>{`${placeName},${state},${country}  `}</li>;
        }
      } else {
        return;
      }
    } else {
      return;
    }
  };

  const renderPlaces = () => {
    if (places) {
      return (
        <h6>Places:
          <ul>{places.map(renderPlace)}</ul>
        </h6>
      );
    }
  };

  const renderOccupation = (occupation, index)=>{
    if (occupation) {
      let occupationName = occupation.term?.term ? occupation.term.term:null;
      if (occupationName) {
        return <li>{occupationName}{'; '}</li>;
      }
    }
  }

  const renderOccupations = () =>{
    if (occupations) {
      return (
        <h6>Occupations:
          <ul>{occupations.map(renderOccupation)}</ul>
        </h6>
      );
    }
  }



  const renderSubject = (subject, index) => {
    if (subject) {
      let subjectName = subject.term?.term ? subject.term.term : null;
      if (subjectName) {
        return (
          <li>
            {subjectName}
          </li>
        );
      }
    }
  };

  const renderSubjects = () => {
    if (subjects) {
      return (
        <h6>Subjects
          <ul>{subjects.map(renderSubject)}</ul>
        </h6>
      );
    }
  };

    const renderSameAsRelation = (sameAsRelation, index) => {
      if (sameAsRelation) {
        let sameAsRelationName = sameAsRelation.uri ? sameAsRelation.uri : null;
        if (sameAsRelationName) {
          return (
            <li>
              <a href={sameAsRelationName}>{sameAsRelationName}</a>
            </li>
          );
        }
      }
    };

    const renderSameAsRelations = () => {
      if (sameAsRelations) {
        return (
          <h6>
            External Records
            <ul>
              <li>
                <a href={"https://snaccooperative.org/view/" + id}>
                  snaccooperative.org
                </a>
              </li>
              {sameAsRelations.map(renderSameAsRelation)}
            </ul>
          </h6>
        );
      }
    };

  const renderRelative = (relation, index) =>{
    return (
      <RelativeCard relation={relation}></RelativeCard>
    )
  }
console.log(relations)
  const renderRelatives = () =>{
    if (relations) {
       return (
         <Row>
           {relations.map(renderRelative)}
         </Row>
       );
    }
  }
  return (
    <Layout>
      <Row>
        <Col>
          <div>
            <img id="bio-image" src={Fox} alt="" />
          </div>
          <h3>{nameEntries[0].original}</h3>
          {renderNameVariants()}
          {renderDates()}
          {renderPlaces()}
          {renderOccupations()}
          {renderSubjects()}
          {renderSameAsRelations()}
          {/* <h1>{`${props.name}  ${props.period}`}</h1> */}
          {/* <img src={props.image} alt={props.alt} />
                <div>{props.links}</div> */}
        </Col>
        <Col>{renderBio()}</Col>
      </Row>
      <h4>Relatives</h4>
        {renderRelatives()}
    </Layout>
  );
};

export default People;
