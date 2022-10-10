import React from "react";
import Layout from "../../components/Layout";
import { globalVariables } from "../../globalVariables";
import {Row, Col} from 'react-bootstrap';
import {Link} from 'gatsby';
import backgroundCards from "../../components/BackgroundCards"
// import "../../../assets/styles/pageStyles.scss";
// import { Row, Col } from "react-bootstrap";
// const appendixData = require("../../../assets/data/john_hunt_appendix.json");

// Image imports
import three from "../../../content/markdown/images/image3.jpg";
import five from "../../../content/markdown/images/image5.jpg";

const pageCardData = [
    {
        text: "Structure of Quaker Meetings",
        link: "/background/quaker-bg/structure-society-friends",
        imageSrc: three,
        alt: "",
        id: ""
    },
    {
        text: "Glossary of Quaker terms",
        link: "/background/quaker-bg/glossary",
        imageSrc: five,
        alt: "",
        id: ""
    }
]

const quaker_bg = () => {
  // const term = (term) => (
  //   <p className="background-text">
  //     <strong>{term.term}</strong>: {term.definition}
  //   </p>
  // );

  return(
      <Layout>
        <h1>Background: The Society of Friends</h1>
        <Row>
            {backgroundCards(pageCardData)}
        </Row>
      </Layout>
  );
};

export default quaker_bg;
