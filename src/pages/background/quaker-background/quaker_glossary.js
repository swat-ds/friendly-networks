import React from "react";
import Layout from "../../../components/Layout";
import Glossary from "../../../components/Glossary";
// import "../../../assets/styles/pageStyles.scss";
// import { Row, Col } from "react-bootstrap";
// const appendixData = require("../../../assets/data/john_hunt_appendix.json");

const quaker_glossary = () => {
  // const term = (term) => (
  //   <p className="background-text">
  //     <strong>{term.term}</strong>: {term.definition}
  //   </p>
  // );
  return (
    <Layout>
      <Glossary></Glossary>
    </Layout>
  );
};

export default quaker_glossary;
