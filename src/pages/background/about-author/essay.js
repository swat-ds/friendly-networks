import React from "react";
import Layout from "../../../components/Layout";
import Essay from "../../../components/Essay";
import "../../../assets/styles/pageStyles.scss"
import { Row, Col } from "react-bootstrap";

const essay = () => {
  return (
    <Layout>
      <Essay />
    </Layout>
  );
};

export default essay;
