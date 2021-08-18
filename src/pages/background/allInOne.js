import React from "react";
import Layout from "../../components/Layout";
import Bibliography from "../../components/Bibliography";
import Essay from "../../components/Essay";
import Glossary from "../../components/Glossary";
import MeetingStructure from "../../components/MeetingStructure";
import Timeline from "../../components/Timeline";
import TabulatedTimeline from "../../components/TabulatedTimeline";
const timelineData = require("../../assets/data/timeline.json");

const allInOne = () => {
  return (
    <Layout>
      <Bibliography />
      <Essay />
      <Glossary />
      <MeetingStructure />
      <Timeline timelineData={timelineData}></Timeline>
      <TabulatedTimeline />
    </Layout>
  );
};

export default allInOne;
