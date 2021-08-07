import React from "react";
import { useState } from "react";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import "../assets/styles/deck.scss";
import EntityCard from "./EntityCard";

//default deck size
let handSize = 8;
let topCardIndex = 0;

const EntityCardDeck = ({entityDeck}) => {
  let bottomCardIndex = topCardIndex + handSize - 1; // 3

  const [currentDeck, setCurrentDeck] = useState(
    entityDeck.slice(topCardIndex, bottomCardIndex + 1)
  );
  const [isLeftClickAble, setIsLeftClickAble] = useState(false);
  const [isRightClickAble, setIsRightClickAble] = useState(true);

  const handleRightArrowClick = () => {
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
    if (bottomCardIndex <= 0 || bottomCardIndex >= entityDeck.length) {
      setIsRightClickAble(false);
    }
    topCardIndex = bottomCardIndex + 1; // => 3+1 = 4
    bottomCardIndex = topCardIndex + handSize - 1; // => 4 + 4-1 = 7;
    setCurrentDeck(entityDeck.slice(topCardIndex, bottomCardIndex + 1));
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
    if (topCardIndex <= 0 || topCardIndex >= entityDeck.length) {
      setIsLeftClickAble(false);
    }
    bottomCardIndex = topCardIndex - 1; // => 4-1 = 3
    topCardIndex = bottomCardIndex - handSize + 1; // => 3 - 4 +1 = 0
    setCurrentDeck(entityDeck.slice(topCardIndex, bottomCardIndex + 1)); // (0, 4)
    setIsRightClickAble(true);
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
    // console.log(currentDeck);
  };
  let cardIndex = topCardIndex;
  const renderCard = (Card, _) => {
      return (
        <EntityCard
          className="card"
          entity={Card}
          index={cardIndex++}
          size={entityDeck.length}
        ></EntityCard>
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
          <span id="right-counter">{entityDeck.length - bottomCardIndex - 1}</span>
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

export default EntityCardDeck;
