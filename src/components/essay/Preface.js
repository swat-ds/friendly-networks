import React from "react";
import "../../assets/styles/background.scss";
import { Row, Col } from "react-bootstrap";
// const appendixData = require("../../../assets/data/john_hunt_appendix.json");
import { StaticImage } from "gatsby-plugin-image";
const Preface = () => {
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
        <div className="appendix-text essay" id="preface">
          <h1 class="c31 c40" id="essay-preface">
            <span class="c18 c13">Preface</span>
          </h1>
          <StaticImage
            className="essay-image"
            alt=""
            src="../../assets/images/image6.jpg"
          />

          <a id="t.684031840da5c4a8914dad4a2ae5411291ae6ca0"></a>
          <a id="t.0"></a>
          <table class="c38">
            <tbody>
              <tr class="c75">
                <td class="c47" colspan="1" rowspan="1">
                  <p class="c36">
                    <span class="c10">
                      Detail, “View in Moorestown,” as published in{" "}
                    </span>
                    <span class="c10 c29">
                      Historical Collections of New Jersey
                    </span>
                    <span class="c9">
                      &nbsp;by John W. &nbsp;Barber &amp; Henry Howe (1844).
                      &nbsp;Courtesy Friends Historical Library of Swarthmore
                      College (A00179830).
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="c6">
            <span class="c9"></span>
          </p>
          <h2 class="c17" id="h.vo332kas1cet">
            <span class="c18 c13">The Form of the Journal</span>
          </h2>
          <p class="c30">
            <span class="c10">
              Following William Penn’s advice, John Hunt kept a journal for over
              half a century, beginning in 1770 and ending shortly before his
              death in 1824. This original work, penned in his own hand, is in
              the collections of Friends Historical Library (hereafter FHL).
            </span>
            <sup class="c8">
              <a href="#ftnt2" id="ftnt_ref2">
                [2]
              </a>
            </sup>
            <span class="c10">
              &nbsp;It survives in eleven separate volumes plus a number of
              loose sheets. It is lacking the section -- apart from the several
              loose sheets -- dating between the end of 1800 and the 7th month
              of 1812.
            </span>
            <sup class="c8">
              <a href="#ftnt3" id="ftnt_ref3">
                [3]
              </a>
            </sup>
            <span class="c9">&nbsp;</span>
          </p>
          <p class="c30">
            <span class="c9">
              Part of the original document was given to Friends Historical
              Library in 1956. This portion consisted of an incomplete
              manuscript, 1812-1824, including two loose sheets from 1806 and
              1808, and 11 parts from 7mo7 1812 to 10mo10 1824. These were said
              to have been in the possession of Dr. Rachel Williams of
              Moorestown, New Jersey, and had been given by her to William Bacon
              Evans for him to convey to this Library. Rachel was the daughter
              of Jonathan G. and Susanna R. Williams, and Susanna was the
              Daughter of David and Rachel Hunt Roberts. The latter was a child
              of Joshua Hunt, John Hunt's half-brother.
            </span>
          </p>
          <p class="c30">
            <span class="c9">
              The earlier section of the original journal was traced to members
              of the Stackhouse family who had inherited it from Asa M.
              Stackhouse. The latter had given permission for an excerpted
              publication to the New Jersey Historical Society in the 1930s. It
              was donated it to FHL in 2004. The part of Hunt’s journal from
              1776 to 1787 was originally bound with accounts dating from
              1769-1772; both of these were paginated, pages numbered 73-172 and
              51-72 respectively. It is unknown what, if anything, preceded page
              51.
            </span>
          </p>
          <p class="c30">
            <span class="c10">
              No manuscript text has yet been discovered covering the period
              from 1800 to 7mo 1812. A much abbreviated text for this period is
              included in{" "}
            </span>
            <span class="c10 c29">Friends Miscellany </span>
            <span class="c10">in 1837.</span>
            <sup class="c8">
              <a href="#ftnt4" id="ftnt_ref4">
                [4]
              </a>
            </sup>
            <span class="c10">&nbsp;John Comly and the other editors of </span>
            <span class="c10 c29">Friends Miscellany</span>
            <span class="c9">
              &nbsp;had access to the entire manuscript, including the now
              missing section, as well as to other writings by Hunt. They took
              great liberties in editing and shortening the text. For instance,
              the published section from 1770-1800 is less than 10% of the
              original for the same period.{" "}
            </span>
          </p>
          <p class="c30">
            <span class="c10">A second variant was published in the </span>
            <span class="c10 c29">
              Proceedings of the New Jersey Historical Society in 1934.
            </span>
            <sup class="c8">
              <a href="#ftnt5" id="ftnt_ref5">
                [5]
              </a>
            </sup>
            <span class="c10">
              &nbsp;It was abridged from the partial original then in the
              possession of T. Matlack Stackhouse, presumed to be the same as
              the first part (1770-1800) of the journal now in the collections
              of FHL.
            </span>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Preface;
