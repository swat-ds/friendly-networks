import React from "react";
import Layout from "./Layout";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import Fox from "../assets/images/george_fox.jpeg";
import "../assets/styles/card.scss";

/**
 * Creates a bootstrap card for each of the entity. Each card contains some brief info about the
 * entity, including the name, date, etc.
 * @param {*} props the properties that can be passed when used this component
 * @returns a react card, wrapped with a GatsbyJS Link
 */

const EntityCard = (props) => {
  const { entity, index, size, className } = props;

  return (
    <Link className="g-link" to={"/entities/" + entity.arkId}>
      {/* <Card className="card entity-card rounded" border="info" style={{borderRadius: "10px"}}>
        <Card.Img className="image-card"
          variant="top"
          src={Fox}
        />
        <Card.Body>
          <Card.Title>
            {entity.entityType.term === "person"
              ? entity.nameEntries[0].original
              : "Corporate Body"}
          </Card.Title>

          <Card.Text>First 100 chars of bio should be here</Card.Text>
        </Card.Body>
      </Card> */}
      <div className={className}>
        <div className="card-body">
          <h5 className="card-title">
            {" "}
            {entity.entityType.term === "person"
              ? entity.nameEntries[0].original
              : "Corporate Body"}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <p>{`${index+1} out of ${size}`}</p>
        </div>
      </div>
    </Link>
  );
};
export default EntityCard;
