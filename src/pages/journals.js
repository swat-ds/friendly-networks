import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import JournalCard from "../components/JournalCard";
import { Button, Card, Row, Col } from "react-bootstrap";

const journals = ({ data }) => {
  const nodes = data.allCetei.nodes;

  const renderJournals = (node, _)=>{
    
    return (
      <Col>
        <JournalCard route={"/" + node.parent.name}></JournalCard>
      </Col>
    );
  }

  return (
      <Layout>
       <Row md={4}>
         {nodes.map(renderJournals)}
       </Row>
      </Layout>
  );
};

export const data = graphql`
  {
    allCetei {
      totalCount
      nodes {
        parent {
          ... on File {
            id
            name
          }
        }
      }
    }
  }
`;
export default journals;
