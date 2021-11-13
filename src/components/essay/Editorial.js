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
      <Col className="background-col general-text">
        <br />
        <h4 className="general-text">Background: Essay</h4>
        <div className="appendix-text essay" id="editorial">
          <h2 class="c17" id="h.flm6ba2mabiq">
            <span class="c18 c13">Editorial Practices</span>
          </h2>
          <p class="c0">
            <span class="c9">
              John Hunt was a good writer, but like most 18th century authors,
              his punctuation, spelling and abbreviations were not standardized
              or necessarily consistent. The goal of the Hunt project was to
              produce a text accessible to the modern reader, retaining all the
              words in the order they appear, but with added punctuation and
              capitalization to make the document readable. Some spelling of
              surnames and places has been corrected in order to facilitate
              searching. Any other additions supplied to aid the reader are
              surrounded by brackets. Archaic forms and spellings of words are
              also retained. &nbsp;“How art thou feeling” remains as written,
              not changed to “How are you feeling.” And Hunt frequently used the
              abbreviation “Do.” for ditto; this has not been changed. The word
              “sic.” means that word or words are transcribed as written.
              Usually this marks an error in the original text. When identified
              by the editor, biblical references, all from the King James
              version, are footnoted. Where Hunt himself identified them as such
              this attribution is retained in the main body of the text. &nbsp;
            </span>
          </p>
          <p class="c30">
            <span class="c9">
              Hunt consistently uses Quaker-style plain dating, avoiding the
              names of the months and the names of days of the week. “Monday,
              October 9th,” for instance, is written as “Second Day, Ninth of
              the Tenth Month.” The headings dividing the texts were added by
              the editors, using the standard names for the months, again for
              ease of reading.{" "}
            </span>
          </p>
          <p class="c30">
            <span class="c9">
              Hunt had a practice of regularly adding to a series of bound
              journals when he was at home, but usually recorded entries while
              he was at Yearly Meeting or travelling in the ministry on single
              sheets of paper. In publishing the entirety of the journal we have
              added “loose” sections where they fit chronologically in the order
              in which they are listed in Appendix C. The end of a single page
              or of a longer bound section is marked with a note in square
              brackets and with a horizontal line.{" "}
            </span>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Intro;
