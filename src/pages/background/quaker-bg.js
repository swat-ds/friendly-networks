import React from "react";
import Layout from "../../components/Layout";
import { SEO } from "../../components/SEO";
import { globalVariables } from "../../globalVariables";
import {Row, Col} from 'react-bootstrap';
import {Link} from 'gatsby';
import homepageCards from "../../components/HomepageCards"
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
        <Row id="main-row" className="background-quaker background-row">
            <h1>Background: The Society of Friends</h1>
            {homepageCards(pageCardData)}
        </Row>
      </Layout>
  );
};

// Enrich <head> tag
export const Head = () => (
  <SEO title="The Society of Friends - Friendly Networks"/>
)

export default quaker_bg;
