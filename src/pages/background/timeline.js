import React from "react";

import { Row, Col } from "react-bootstrap";

import Layout from "../../components/Layout";
import { Seo } from "../../components/SEO";
import Timeline from "../../components/Timeline";

import "../../styles/pageStyles.scss";

const timelineData = require("../../../content/timeline.json");
const timeline = () => {
  return (
    <Layout>
      <Row>
        <Col>
          <h3 className="general-text" style={{ marginLeft: "2vw"}}>
            Chronology of the Life of John Hunt (1740-1824)
          </h3>
        </Col>
      </Row>
      <br />

      <Timeline timelineData={timelineData}></Timeline>
    </Layout>
  );
};

// Enrich <head> tag
export const Head = () => (
  <Seo title="Hunt Timeline - Friendly Networks"/>
)

export default timeline;
