import React from "react";
import Layout from "../../../components/Layout";
import Bibliography from "../../../components/Bibliography";
import "../../../assets/styles/pageStyles.scss";
import { Row, Col } from "react-bootstrap";
const appendixData = require("../../../assets/data/john_hunt_appendix.json");

const bibliography = () => {
  const bib = (key_values_pair) => (

    <p className="background-text">
      <strong>{key_values_pair.key}</strong>
      <br/>
      <span>{key_values_pair.values.join("\n")}</span>:
    </p>
  );
  return (
    <Layout>
      <Bibliography/>
    </Layout>
  );
};

export default bibliography;
