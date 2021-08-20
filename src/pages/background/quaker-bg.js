import React from "react";
import Layout from "../../components/Layout";
import SideScroll from "../../components/SideScroll";
import Glossary from "../../components/Glossary";
import MeetingStructure from "../../components/MeetingStructure";
// import "../../../assets/styles/pageStyles.scss";
// import { Row, Col } from "react-bootstrap";
// const appendixData = require("../../../assets/data/john_hunt_appendix.json");

const links = [
  {
    title: "Quaker Meeting Structure",
    link: "/background/quaker-bg#meeting-structure",
  },
  {
    title: "Quakerism Glossary",
    link: "/background/quaker-bg#quaker-glossary",
  },
];
const quakeer_bg = () => {
  // const term = (term) => (
  //   <p className="background-text">
  //     <strong>{term.term}</strong>: {term.definition}
  //   </p>
  // );
  return (
    <Layout>
      <SideScroll links={links} />
      <MeetingStructure />
      <Glossary />
    </Layout>
  );
};

export default quakeer_bg;
