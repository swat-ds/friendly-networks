import React from 'react'
import { Link } from "gatsby";
import Layout from "../../../components/Layout";
import WhyKeep from "../../../components/essay/WhyKeep";
import { Button, Row, Col } from "react-bootstrap";

const whykeep = () => {
    return (
      <Layout>
        <WhyKeep/>
      </Layout>
    );
}

export default whykeep
