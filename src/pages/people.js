import React from "react";
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import "../assets/styles/people.scss"
import PeopleCard from  "../components/PeopleCard"

const people = ({ data }) => {

  const renderPeople = (entity, index) => {
    return (
      <div id="entity-card">
      <PeopleCard entity={entity}></PeopleCard>
      </div>
    );
  };
  
  return (
    <Layout>
      <Row id="all-entity-row">
        <Col id="left-arrow-col">
          <div id="left-triangle-arrow"></div>
        </Col>
        <Col id="card-entity-col">
          {data.allConstellation.nodes.slice(1, 5).map(renderPeople)}
        </Col>
        <Col
          id="right-arrow-col"
        >
          <div id="right-triangle-arrow"></div>
        </Col>
      </Row>
    </Layout>
  );
};

 export const query = graphql`
  {
    allConstellation {
      nodes {
        id
        entityType {
          term
        }
        nameEntries {
          original
        }
      }
    }
  }
`;

export default people;
