import React from "react";
import "../assets/styles/background.scss";
import { Row, Col } from "react-bootstrap";
// const appendixData = require("../../../assets/data/john_hunt_appendix.json");

const TabulatedTimeline = () => {
  // const term = (term) => (
  //   <p className="background-text">
  //     <strong>{term.term}</strong>: {term.definition}
  //   </p>
  // );
  return (
    <Row>
      <Col className="background-col">
        <br />
        <h4 className="general-text">Tabulated Format</h4>
        <div className="appendix-text" id="appendix-tabulated">
          
        </div>
      </Col>
    </Row>
  );
};

export default TabulatedTimeline;
