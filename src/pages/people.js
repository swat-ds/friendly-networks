import React from "react";
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import EntityCardDeck from  "../components/EntityCardDeck"

const people = ({ data }) => {
  let deck = data.allConstellation.nodes
    return (
      <Layout>
        <EntityCardDeck entityDeck={deck}></EntityCardDeck>
      </Layout>
    );
};

export default people;

 export const query = graphql`
  {
    allConstellation {
      nodes {
        id
        arkId
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

