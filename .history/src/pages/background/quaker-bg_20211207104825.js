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
      <Link className="g-link2" to={globalVariables.whyKeep}>
        {/* <Button variant="outline-success">Friends</Button> */}
        <div className="box blue">
          <h2>Why Keep the journals</h2>
          <p>
            Why keep a journal? Hunt explained his resolve in the very first
            entry...
          </p>
        </div>
      </Link>
    </Layout>
  );
};

export default quakeer_bg;
