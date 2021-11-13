import React from "react";
import Layout from "../../../components/Layout";
import Timeline from "../../../components/Timeline";
import Essay from "../../../components/Essay";
import TabulatedTimeline from "../../../components/TabulatedTimeline";

const timelineData = require("../../../assets/data/timeline.json");

const all = () => {
  return <Layout>
      <Essay/>
      <Timeline timelineData={timelineData}/>
      <TabulatedTimeline/>
  </Layout>;
};

export default all;
