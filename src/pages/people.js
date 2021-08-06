import React from "react";
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import "../assets/styles/people.scss"
import Entities from  "../components/Entities"

const people = ({ data }) => {
    return (
      <Layout>
        <Entities data={data}></Entities>
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

