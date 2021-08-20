import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import "../../assets/styles/background.scss";
import Layout from "../../components/Layout";
import SideScroll from "../../components/SideScroll";
import Bibliography from "../../components/Bibliography";
import Essay from "../../components/Essay";
import Glossary from "../../components/Glossary";
import MeetingStructure from "../../components/MeetingStructure";
import Timeline from "../../components/Timeline";
import TabulatedTimeline from "../../components/TabulatedTimeline";
const timelineData = require("../../assets/data/timeline.json");

const links = [
  {
    title: "Bibliography",
    link: "/background/allInOne#appendix-bib",
  },
  {
    title: "Bibliography",
    link: "/background/allInOne#appendix-bib",
  },
  {
    title: "Bibliography",
    link: "/background/allInOne#appendix-bib",
  },
];
const allInOne = () => {
  return (
    <Layout>
      <div className="scroll-links">
        <AnchorLink
          className="g-link a-link"
          to="/background/allInOne#appendix-bib"
        >
          <span>Bibliography</span>
        </AnchorLink>
        <AnchorLink
          className="g-link a-link"
          to="/background/allInOne#appendix-essay"
        >
          <span>Essay</span>
        </AnchorLink>
        <AnchorLink
          className="g-link a-link"
          to="/background/allInOne#appendix-glossary"
        >
          <span>Glossary</span>
        </AnchorLink>
        <AnchorLink
          className="g-link a-link"
          to="/background/allInOne#appendix-structure"
        >
          <span>Structure</span>
        </AnchorLink>
        <AnchorLink
          className="g-link a-link"
          to="/background/allInOne#appendix-timeline"
        >
          <span>Timeline</span>
        </AnchorLink>
        <AnchorLink
          className="g-link a-link"
          to="/background/allInOne#appendix-tabulated"
        >
          <span>Tabulated Timeline</span>
        </AnchorLink>
      </div>
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
