import React from "react";
import Layout from "../../components/Layout";
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
        <h1>Background: The Society of Friends</h1>
        <Row>
            {homepageCards(pageCardData)}
        </Row>
      </Layout>
  );

  return (
    <Layout>
      <Row id="main-row">
        <Col id="bg-col">
          <Link className="g-link2" to={globalVariables.quaker_meeting_structure}>
            {/* <Button variant="outline-success">All in One</Button> */}
            <div className="box blue">
              <h2>The structure of the Quaker meetings</h2>
              <p>
                Philadelphia Yearly Meeting published its first printed
                Discipline in 1797. Its introduction included...
              </p>
            </div>
          </Link>
          <Link className="g-link2" to={globalVariables.testimonies}>
            {/* <Button variant="outline-success">All in One</Button> */}
            <div className="box cyan">
              <h2>The Testimonies of Quaker</h2>
              <p>
                The first printed Discipline of Philadelphia Yearly Meeting
                included separate sections on core eighteenth century Quaker
                testimonies...
              </p>
            </div>
          </Link>
          <Link className="g-link2" to={globalVariables.glossary}>
            {/* <Button variant="outline-success">All in One</Button> */}
            <div className="box orange">
              <h2>Glossary of the Quakerism</h2>
              <p>
                Acknowledgement: A formal, written statement of apology by an
                offending member to the meeting for having acted in a manner
                contrary to the rules of discipline.
              </p>
            </div>
          </Link>
        </Col>
      </Row>
    </Layout>
  );
};

export default quaker_bg;
