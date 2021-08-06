import React from "react";
import {useState} from 'react'
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import "../assets/styles/entities.scss";
import PeopleCard from "./PeopleCard";

let deckSize = 4;
let topCardIndex = 0;
let bottomCardIndex = topCardIndex + deckSize - 1; // 3
const Entities = ({ data }) => {

  const nodes = data.allConstellation.nodes;
   const [currentDeck, setCurrentDeck] = useState(nodes.slice(topCardIndex, bottomCardIndex+1));

  const handleRightArrowClick = () =>{
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
    topCardIndex = bottomCardIndex+1; // => 3+1 = 4
    bottomCardIndex = topCardIndex + deckSize-1; // => 4 + 4-1 = 7;
    setCurrentDeck(
      nodes.slice(topCardIndex, bottomCardIndex+1)
    );
    // console.log(topCardIndex, bottomCardIndex);
    // console.log(nodes[topCardIndex]);
    // console.log(nodes[bottomCardIndex]);
  }
    const handleLeftArrowClick = () => {
      // console.log(topCardIndex, bottomCardIndex);
      // console.log(nodes[topCardIndex]);
      // console.log(nodes[bottomCardIndex]);
      //4
      bottomCardIndex = topCardIndex-1; // => 4-1 = 3
      topCardIndex  = bottomCardIndex - deckSize+1; // => 3 - 4 +1 = 0
      setCurrentDeck(nodes.slice(topCardIndex, bottomCardIndex+1)); // (0, 4)
      // console.log(topCardIndex, bottomCardIndex);
      // console.log(nodes[topCardIndex]);
      // console.log(nodes[bottomCardIndex]);
      // console.log(currentDeck);
    };
let cardIndex = topCardIndex;
  const renderCard = (entity,  _) =>{
    return <PeopleCard className="card" entity={entity} index={cardIndex++} size={nodes.length}></PeopleCard>
  }

  const renderAllCards = () =>{
    return (
      <Col xs={10} id="card-entity-col">
        {currentDeck.map(renderCard)}
      </Col>
    );
  }

  return (
    <Row id="all-entity-row">
      <Col id="left-arrow-col">
        <div
          id="left-triangle-arrow"
          onClick={() => handleLeftArrowClick()}
        ></div>
        <span id="left-counter">{topCardIndex}</span>
      </Col>
      {renderAllCards()}
      <Col id="right-arrow-col">
        <span id="right-counter">{nodes.length-bottomCardIndex}</span>
        <div
          id="right-triangle-arrow"
          onClick={() => handleRightArrowClick()}
        ></div>
      </Col>
    </Row>
  );
};



export default Entities;
