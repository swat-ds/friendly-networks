import React from "react";
import Layout from "../../../components/Layout";
import MeetingStructure from "../../../components/MeetingStructure";
import "../../../assets/styles/pageStyles.scss";
import { Row, Col } from "react-bootstrap";
const appendixData = require("../../../assets/data/john_hunt_appendix.json");
/**
    {
        "style": "normal",
        "text": [
          "Philadelphia Yearly Meeting published its first printed Discipline in 1797. Its introduction included a paragraph on the structure of its constituent bodies:"
        ]
      }, 
 */
const quaker_meeting_structure = () => {
  // const getText = (textItem) => {
  //   if (textItem.style == "italic") {
  //     return <p style={{ fontStyle: "italic" }}>{textItem.text}</p>;
  //   } else {
  //     return <p>{textItem.text}</p>;
  //   }
  // };
  return (
    <Layout>
      <MeetingStructure />
    </Layout>
  );
};

export default quaker_meeting_structure;
