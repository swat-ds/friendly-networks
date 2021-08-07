import React from "react";
import { useState } from "react";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import "../assets/styles/deck.scss";
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
  const [isLeftClickAble, setIsLeftClickAble] = useState(false);
  const [isRightClickAble, setIsRightClickAble] = useState(true);

  const handleRightArrowClick = () => {
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
    if (bottomCardIndex <= 0 || bottomCardIndex >= relationDeck.length) {
      setIsRightClickAble(false);
    }
    topCardIndex = bottomCardIndex + 1; // => 3+1 = 4
    bottomCardIndex = topCardIndex + handSize - 1; // => 4 + 4-1 = 7;
    setCurrentDeck(relationDeck.slice(topCardIndex, bottomCardIndex + 1));
    setIsLeftClickAble(true);
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
  };
  const handleLeftArrowClick = () => {
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
    //4
    if (topCardIndex <= 0 || topCardIndex >= relationDeck.length) {
      setIsLeftClickAble(false);
    }
    bottomCardIndex = topCardIndex - 1; // => 4-1 = 3
    topCardIndex = bottomCardIndex - handSize + 1; // => 3 - 4 +1 = 0
    setCurrentDeck(relationDeck.slice(topCardIndex, bottomCardIndex + 1)); // (0, 4)
    setIsRightClickAble(true);
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
    // console.log(currentDeck);
  };
  let cardIndex = topCardIndex;
  const renderCard = (relation, _) => {
    return (
      <RelationCard
        className="card"
        relation={relation}
        index={cardIndex++}
        size={relationDeck.length}
      ></RelationCard>
    );
  };
  const renderDeck = () => {
    return (
      <Col xs={10}>
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
          style={
            !isLeftClickAble ? { pointerEvents: "none", opacity: "0.2" } : {}
          }
          id="left-triangle-arrow"
          onClick={() => handleLeftArrowClick()}
        ></div>
        <span id="left-counter">{topCardIndex}</span>
      </Col>
      {renderDeck()}
      <Col id="right-arrow-col">
        <span id="right-counter">{relationDeck.length - bottomCardIndex - 1}</span>
        <div
          style={
            !isRightClickAble ? { pointerEvents: "none", opacity: "0.2" } : {}
          }
          id="right-triangle-arrow"
          onClick={() => handleRightArrowClick()}
        ></div>
      </Col>
    </Row>
  );
};

export default RelationCardDeck;
