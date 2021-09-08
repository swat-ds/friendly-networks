import React from "react";
import { useState } from "react";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import "../assets/styles/entity.scss";
import RelationCard from "./RelationCard";


<<<<<<< HEAD
const RelationCardDeck = ({ relationDeck }) => {



  const renderCard = (relation, index) => {
    return (
      <RelationCard
        relation={relation}
        index={index+1}
        size={relationDeck.length}
      ></RelationCard>
    );
  };
  const renderDeck = () => {
    return (
      <Col style={{margin: "2vw"}}xs={10}>
        <div class="card-entity-col">
          {relationDeck.map(renderCard)}
        </div>
      </Col>
=======

const RelationCardDeck = ({ relationDeck }) => {


  const renderEntityRow = (relation, index) => {

    let type = "unknown";
    let note = "unknown";
    let name = "unknown";
    let date = "unknown";
    let arkId = "";
    if ("note" in relation) {
      note = relation.note;
    }
    let content = "";
    if (relation) {
      type = relation.type?.term ? relation.type?.term : type;
      content = relation.content ? relation.content : content;
      arkId = relation.targetArkID.split("/").pop();
      if (content != "unknown") {
        content = content.split(",");
        date = content.pop();
        name = content.join(",");
      }
    }
    
    return (
      <tr scope="row">
        <td>{date}</td>
        <td>
            <Link className="g-link" to={"/entities/" + arkId}>{name}</Link>
        </td>
        <td>{type}</td>
        <td>{note}</td>
        <td>
          <a href="#" class="more">
            SNACC Link
          </a>
        </td>
      </tr>
>>>>>>> network
    );
  };


  return (
<<<<<<< HEAD
    <Row id="all-entity-row">
      {renderDeck()}
=======
    <Row id="main-row">
      {/* <Col id="left-arrow-col">
        <div
          id="left-triangle-arrow"
          onClick={() => handleLeftArrowClick()}
        ></div>
        <span id="left-counter"></span>
      </Col>
      {renderDeck()}
      <Col id="right-arrow-col">
        <span id="right-counter"></span>
        <div
          id="right-triangle-arrow"
          onClick={() => handleRightArrowClick()}
        ></div>
      </Col> */}

      <div class="table-responsive">
        <table class="table table-striped custom-table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Relation Type</th>
              <th scope="col">Note</th>
              <th scope="col">External Source</th>
              {/* <th scope="col">Link</th> */}
            </tr>
          </thead>
          <tbody>
            {relationDeck.map(renderEntityRow)}
          </tbody>
        </table>
      </div>
>>>>>>> network
    </Row>
  );
};

export default RelationCardDeck;
