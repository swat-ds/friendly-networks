import React from "react";
import Layout from "../../components/Layout";
import Glossary from "../../components/Glossary";
import MeetingStructure from "../../components/MeetingStructure";
import { globalVariables } from "../../assets/data/globalVariables";
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
                Philadelphia Yearly Meeting published its first printed
                Discipline in 1797. Its introduction included...
              </p>
            </div>
          </Link>
          <Link className="g-link2" to={globalVariables.testimonies}>
            {/* <Button variant="outline-success">All in One</Button> */}
            <div className="box blue">
              <h2>The structure of the Quaker meetings</h2>
              <p>
                The first printed Discipline of Philadelphia Yearly Meeting
                included separate sections on core eighteenth century Quaker
                testimonies...
              </p>
            </div>
          </Link>
          <Link className="g-link2" to={globalVariables.glossary}>
            {/* <Button variant="outline-success">All in One</Button> */}
            <div className="box blue">
              <h2>The structure of the Quaker meetings</h2>
              <p></p>
            </div>
          </Link>
        </Col>
      </Row>
    </Layout>
  );
};

export default quakeer_bg;
