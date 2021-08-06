import React from "react";
import { useState } from "react";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import "../assets/styles/deck.scss";
import EntityCard from "./EntityCard";
import RelativeCard from "./RelativeCard";



let deckSize = 4;
let topCardIndex = 0;
let bottomCardIndex = topCardIndex + deckSize - 1; // 3

const Deck = ({ deck, cardType }) => {
  const [currentDeck, setCurrentDeck] = useState(
    deck.slice(topCardIndex, bottomCardIndex + 1)
  );

  const handleRightArrowClick = () => {
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
    topCardIndex = bottomCardIndex + 1; // => 3+1 = 4
    bottomCardIndex = topCardIndex + deckSize - 1; // => 4 + 4-1 = 7;
    setCurrentDeck(deck.slice(topCardIndex, bottomCardIndex + 1));
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
  };
  const handleLeftArrowClick = () => {
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
    //4
    bottomCardIndex = topCardIndex - 1; // => 4-1 = 3
    topCardIndex = bottomCardIndex - deckSize + 1; // => 3 - 4 +1 = 0
    setCurrentDeck(deck.slice(topCardIndex, bottomCardIndex + 1)); // (0, 4)
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
    // console.log(currentDeck);
  };
  let cardIndex = topCardIndex;
  const renderCard = (Card, _) => {
    if (cardType == "entity") {
      return (
        <EntityCard
          className="card"
          entity={Card}
          index={cardIndex++}
          size={deck.length}
        ></EntityCard>
      );
    } else if (cardType == "relative") {
      return (
        <RelativeCard
          className="card"
          relative={Card}
          index={cardIndex++}
          size={deck.length}
        ></RelativeCard>
      );
    }
    else {return;}
  };

  const renderDeck = () => {
    return (
      <Col xs={10} id="card-entity-col">
        {currentDeck.map(renderCard)}
      </Col>
    );
  };

  // const ltaStyle = {
  //   pointerEvents: topCardIndex == 0? "none" : "cursor",

  // }
  return (
    <Row id="all-entity-row">
      <Col id="left-arrow-col">
        <div
          style={topCardIndex ==0 ? { pointerEvents: "none", opacity: "0.2" } : {}}
          id="left-triangle-arrow"
          onClick={() => handleLeftArrowClick()}
        ></div>
        <span id="left-counter">{topCardIndex}</span>
      </Col>
      {renderDeck()}
      <Col id="right-arrow-col">
        <span id="right-counter">{deck.length - bottomCardIndex}</span>
        <div
          id="right-triangle-arrow"
          onClick={() => handleRightArrowClick()}
        ></div>
      </Col>
    </Row>
  );
};

export default Deck;
