import React from "react";
import Layout from "../../../components/Layout";
import Timeline from "../../../components/Timeline";
import TabulatedTimeline from "../../../components/TabulatedTimeline";
import { Row, Col } from "react-bootstrap";
import "../../../assets/styles/pageStyles.scss";
const timelineData = require("../../../assets/data/timeline.json");
const timeline = () => {
  return (
    <Layout>
      <Row>
        <Col>
          <h3 style={{ marginLeft: "2vw" }}>
            Chronology of the Life of John Hunt (1740-1824)
          </h3>
        </Col>
      </Row>
      <br />

      <Timeline timelineData={timelineData}></Timeline>
      <br />
      <TabulatedTimeline />
    </Layout>
  );
};

export default timeline;
