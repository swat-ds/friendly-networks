import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import JournalCard from "../components/JournalCard";
import { Button, Card, Row, Col } from "react-bootstrap";
import "../assets/styles/pageStyles.scss"

const journals = ({ data }) => {
  const nodes = data.allCetei.nodes;

  const renderJournals = (node, index)=>{
    
    return (
      <Col style={{ border: "0.2px solid lightblue" }}>
        <JournalCard route={"/" + node.parent.name} 
        title="John Hunt Journal"
        subtitle="1740" 
        text="Then there was the first line of text which brought here" 
        index={index}
        total ={nodes.length}
        ></JournalCard>
      </Col>
    );
  }

  return (
      <Layout>
       <Row md={4} id="journal-card-row">
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
