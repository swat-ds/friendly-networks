import React from "react";
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import Fox from "../assets/images/george_fox.jpeg"
import "../assets/styles/styles.scss"


const relatives = ({ data }) => {
  const renderRelatives = (entity, index) => {
    return (
      <Col>
        <Card bsPrefix="card entity-card" border="success">
          <Link to={"/entities/" + entity.id}>
            <Card.Img
              variant="top"
              src={Fox}
              style={{ height: "18rem", width: "20rem" }}
            />
          </Link>
          <Card.Body>
            <Link className="entity-link" to={"/entities/" + entity.id}>
              <Card.Title>
                {entity.entityType.term === "person"
                  ? entity.nameEntries[0].original
                  : "Corporate Body"}
              </Card.Title>
            </Link>
            <Card.Text>First 100 chars of bio should be here</Card.Text>
            {/* <Link to={"/entities/" + entity.id}>
              <Button variant="outline-info">{"More"}</Button>
            </Link> */}
          </Card.Body>
        </Card>
      </Col>
    );
  };
  
  return (
    <Layout>
      <Row md={4}>
          {data.allConstellation.nodes.map(renderRelatives)}
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

export default relatives;
