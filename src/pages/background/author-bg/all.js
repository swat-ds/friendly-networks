import React from "react";
import Layout from "../../../components/Layout";
import Timeline from "../../../components/Timeline";
import Essay from "../../../components/Essay";
import TabulatedTimeline from "../../../components/TabulatedTimeline";
import SideScroll from "../../../components/SideScroll";

const timelineData = require("../../../assets/data/timeline.json");

const links = [
  {
    title: "Essay",
    link: "/background/author-bg/all#appendix-essay",
  },

  {
    title: "Testimonies",
    link: "/background/author-bg/all#monthly-meeting-testimonies",
  },
  {
    title: "Preface",
    link: "/background/author-bg/all#preface",
  },
  {
    title: "Journal Form",
    link: "/background/author-bg/all#journal-form",
  },
  {
    title: "Acknowledgement",
    link: "/background/author-bg/all#acknowledgment",
  },
  {
    title: "Editorial Practice",
    link: "/background/author-bg/all#editorial-practice",
  },
  {
    title: "Introduction",
    link: "/background/author-bg/all#introduction",
  },

  {
    title: "Why Keep a Journal?",
    link: "/background/author-bg/all#why-keep",
  },

  {
    title: "Family",
    link: "/background/author-bg/all#family",
  },
  {
    title: "World of John Hunt",
    link: "/background/author-bg/all#quaker-world",
  },
  {
    title: "Dear Friends:",
    link: "/background/author-bg/all#dear-friends",
  },

  {
    title: "Hunt’s Bookshelf",
    link: "/background/author-bg/all#hunt-bookshelf",
  },
  {
    title: "Timeline",
    link: "/background/author-bg/all#timeline",
  },
  {
    title: "Timeline data",
    link: "/background/author-bg/all#appendix-tabulated",
  },
];
const all = () => {
  return <Layout>
      <SideScroll links={links}/>
      <Essay/>
      <Timeline timelineData={timelineData}/>
      <TabulatedTimeline/>
  </Layout>;
};

export default all;
