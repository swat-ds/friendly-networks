import React from "react";
import { useState } from "react";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import "../assets/styles/entity.scss";
import EntityCard from "./EntityCard";


const EntityCardDeck = ({entityDeck}) => {

  // Sort Objects Numerically

  entityDeck.sort( (a, b) => a.nameEntries[0].original > b.nameEntries[0].original?  1: -1);

  // Sort Objects Alphabetically

  const renderCard = (Card, index) => {
    return (
      <Col style={{ border: "0.2px solid lightblue" }}>
        <EntityCard
          entity={Card}
          index={index}
          size={entityDeck.length}
        ></EntityCard>
      </Col>
    );
  };

  return (
    <Row md={4} id="all-entity-row">
      {entityDeck.map(renderCard)}
    </Row>
  );
};

export default EntityCardDeck;
