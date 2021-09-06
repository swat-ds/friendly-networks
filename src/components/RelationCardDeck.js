import React from "react";
import { useState } from "react";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import "../assets/styles/entity.scss";
import RelationCard from "./RelationCard";


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
    );
  };

  return (
    <Row id="all-entity-row">
      {renderDeck()}
    </Row>
  );
};

export default RelationCardDeck;
