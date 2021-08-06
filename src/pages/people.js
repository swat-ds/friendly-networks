import React from "react";
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
//TODO: May want to remove this
import "../assets/styles/deck.scss";
import Deck from  "../components/Deck"

const people = ({ data }) => {
  let deck = data.allConstellation.nodes
    return (
      <Layout>
        <Deck deck={deck} cardType="entity"></Deck>
      </Layout>
  );
};

export default people;

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

