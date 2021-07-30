import React from "react";
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import "../assets/styles/styles.scss"
import PeopleCard from  "../components/PeopleCard"

const people = ({ data }) => {

  const renderPeople = (entity, index) => {
    return (
      <Col>
      <PeopleCard entity={entity}></PeopleCard>
      </Col>
    );
  };
  
  return (
    <Layout>
      <Row md={4}>
          {data.allConstellation.nodes.map(renderPeople)}
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
