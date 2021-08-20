import React from "react";
import { Link } from "gatsby";
import Layout from "../../../components/Layout";
import Family from "../../../components/essay/Family";
import { Button, Row, Col } from "react-bootstrap";

const family = () => {
  return (
    <Layout>
        <Family/>
    </Layout>
  );
};

export default family;
