import React from "react";
import Layout from "./Layout";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import Fox from "../assets/images/george_fox.jpeg";
import "../assets/styles/styles.scss";
import "../assets/styles/card.scss";
import { color } from "d3";

const PeopleCard = (props) => {
    const {entity} = props
  return (
    <Link
      className="g-link"
      to={"/entities/" + entity.id}
    >
      <Card bsPrefix="card entity-card" border="success">
        <Card.Img
          variant="top"
          src={Fox}
          style={{ height: "18rem", width: "20rem" }}
        />
        <Card.Body>
          <Card.Title>
            {entity.entityType.term === "person"
              ? entity.nameEntries[0].original
              : "Corporate Body"}
          </Card.Title>

          <Card.Text>First 100 chars of bio should be here</Card.Text>
          {/* <Link to={"/entities/" + entity.id}>
              <Button variant="outline-info">{"More"}</Button>
            </Link> */}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PeopleCard;
