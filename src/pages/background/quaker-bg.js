import React from "react";
import Layout from "../../components/Layout";
import { SEO } from "../../components/SEO";
import {Row, Col} from 'react-bootstrap';
import HomepageCards from "../../components/HomepageCards"
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
            <HomepageCards id="qbg-cards" cardArray={pageCardData} sm={6} md={5}/>
        </Row>
      </Layout>
  );
};

// Enrich <head> tag
export const Head = () => (
  <SEO title="The Society of Friends - Friendly Networks"/>
)

export default quaker_bg;
