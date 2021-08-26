import React from "react";
import { useState } from "react";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import "../assets/styles/entity.scss";
import RelationCard from "./RelationCard";

//default deck size
let handSize = 4;
let topCardIndex = 0;

const RelationCardDeck = ({ relationDeck }) => {

  //Adjusting handSize best on the length of deck
  if(relationDeck.length >= 10){
    handSize = 8;
  }

  let bottomCardIndex = topCardIndex + handSize - 1; // 3

  const [currentDeck, setCurrentDeck] = useState(
    relationDeck.slice(topCardIndex, bottomCardIndex + 1)
  );

  const handleRightArrowClick = () => {


    topCardIndex = bottomCardIndex + 1; // => 3+1 = 4
    bottomCardIndex = topCardIndex + handSize - 1; // => 4 + 4-1 = 7;
    setCurrentDeck(relationDeck.slice(topCardIndex, bottomCardIndex + 1))
  };
  const handleLeftArrowClick = () => {
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
    //4
    bottomCardIndex = topCardIndex - 1; // => 4-1 = 3
    topCardIndex = bottomCardIndex - handSize + 1; // => 3 - 4 +1 = 0
    setCurrentDeck(relationDeck.slice(topCardIndex, bottomCardIndex + 1)); // (0, 4)
  };
  
  let cardIndex = topCardIndex;
  const renderCard = (relation, _) => {
    return (
      <RelationCard
        relation={relation}
        index={cardIndex++}
        size={relationDeck.length}
      ></RelationCard>
    );
  };
  const renderDeck = () => {
    return (
      <Col style={{margin: "2vw"}}xs={10}>
        <div class="card-entity-col">
          {currentDeck.slice(0, currentDeck.length / 2).map(renderCard)}
        </div>
        <div>
          {" "}
          <div class="card-entity-col">
            {currentDeck
              .slice(currentDeck.length / 2, currentDeck.length)
              .map(renderCard)}
          </div>
        </div>
      </Col>
    );
  };

  return (
    <Row id="all-entity-row">
      <Col id="left-arrow-col">
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
      </Col>
    </Row>
  );
};

export default RelationCardDeck;
