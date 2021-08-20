import React from "react";
import "../../assets/styles/background.scss";
import { Row, Col } from "react-bootstrap";
// const appendixData = require("../../../assets/data/john_hunt_appendix.json");
import { StaticImage } from "gatsby-plugin-image";
const Intro = () => {
  // const term = (term) => (
  //   <p className="background-text">
  //     <strong>{term.term}</strong>: {term.definition}
  //   </p>
  // );
  return (
    <Row>
      <Col className="background-col">
        <br />
        <h4 className="background-text">Background: Essay</h4>
        <div className="appendix-text essay" id="acknowledgment">
          <h2 class="c17">
            <span class="c18 c13">Acknowledgements</span>
          </h2>
          <p class="c30">
            <span class="c9">
              First and foremost, David and Joyce Hunt have enabled this project
              to go forward. They have largely funded the transcription of
              Hunt’s journal and also that of Joshua Evans. But perhaps of more
              importance to the success of this project is their enthusiastic
              encouragement.{" "}
            </span>
          </p>
          <p class="c30">
            <span class="c10">
              The transcription of the John Hunt journal could not have been
              completed without the labor of a decade of Swarthmore College
              student assistants and interns. The original manuscripts had to be
              transcribed and the transcripts rechecked. In this effort special
              thanks go to Jon Peters, Claudia Seixas, Aaron Brecher, Celia
              Caust-Ellenbogen, Isa St. Clair, Chelsie Juliet Rowell, Chris
              Geissler, Chris Sikandra, Jessica Engebretson, Findlay Logan, Yuan
              Liu, Chris Wickham, and the many others who assisted in a variety
              of ways from time to time.
            </span>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Intro;
