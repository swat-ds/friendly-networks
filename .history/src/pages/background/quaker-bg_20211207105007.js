import React from "react";
import Layout from "../../components/Layout";
import Glossary from "../../components/Glossary";
import MeetingStructure from "../../components/MeetingStructure";
// import "../../../assets/styles/pageStyles.scss";
// import { Row, Col } from "react-bootstrap";
// const appendixData = require("../../../assets/data/john_hunt_appendix.json");

const quakeer_bg = () => {
  // const term = (term) => (
  //   <p className="background-text">
  //     <strong>{term.term}</strong>: {term.definition}
  //   </p>
  // );
  return (
    <Layout>
      <Row id="main-row">
        <Col id="bg-col">
          <Link className="g-link2" to={globalVariables.MeetingStructure}>
            {/* <Button variant="outline-success">All in One</Button> */}
            <div className="box blue">
              <h2>The structure of the Quaker meetings</h2>
              <p>
                Click on this one to view the entire essay, timeline,
                bibliography, etc.{" "}
              </p>
            </div>
          </Link>
        </Col>
      </Row>
    </Layout>
  );
};

export default quakeer_bg;
