import React from 'react'
import Layout from "../components/Layout";
import Timeline from "../components/Timeline";
const timelineData = require("../assets/data/timeline.json");
const timeline = () => {
    return (
      <Layout>
        <Timeline timelineData={timelineData}></Timeline>
      </Layout>
    );
}

export default timeline
