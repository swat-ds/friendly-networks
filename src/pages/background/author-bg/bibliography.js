import React from "react";
import Layout from "../../../components/Layout";
import Bibliography from "../../../components/Bibliography";
import "../../../assets/styles/pageStyles.scss";
import { Row, Col } from "react-bootstrap";
const appendixData = require("../../../assets/data/john_hunt_appendix.json");

const bibliography = () => {
  return (
    <Layout>
      <Bibliography/>
    </Layout>
  );
};

export default bibliography;
