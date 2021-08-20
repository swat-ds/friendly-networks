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
        <div className="appendix-text essay" id="introduction">
          <h2 class="c17">
            <span class="c18 c13">Introducing John Hunt</span>
          </h2>
          <p class="c0">
            <span class="c9">
              John Hunt was a Quaker minister from Burlington County, New
              Jersey. He was born in 1740 and died in 1824. At the age of thirty
              Hunt began keeping a daily journal and continued it until his
              death, a remarkable fifty-four years recording his everyday
              activities and intimate thoughts. While this journal is not a
              literary masterpiece, it does present extraordinary insights into
              his life and times.
            </span>
          </p>
          <StaticImage
            className="essay-image"
            alt=""
            src="../../assets/images/image4.jpg"
          />{" "}
          <a id="t.1da658536e55dc963e6dc8e34d5ccfea4b59c35b"></a>
          <a id="t.1"></a>
          <table class="c38">
            <tbody>
              <tr class="c64">
                <td class="c47" colspan="1" rowspan="1">
                  <p class="c36">
                    <span class="c10">
                      “A View of the residence of Richard Jordan taken from
                      Newtown Meeting House New Jersey,” about 1826. The image
                      was{" "}
                    </span>
                    <span class="c10 c34">
                      drawn by W. Mason and engraved by Francis Kearny.{" "}
                    </span>
                    <span class="c9">
                      Jordan was, like John Hunt, a Quaker minister, and had
                      property in what is now Camden. Hunt knew Jordan and the
                      latter is mentioned several times in the journal. This is
                      also one of a very few images of a farm in southern New
                      Jersey in the early 19th century. Courtesy Friends
                      Historical Library of Swarthmore College (A00179829).
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="c50 c16">
            <span class="c9"></span>
          </p>
          <p class="c50">
            <span class="c9">
              There is very little information about the first years of Hunt’s
              life. He was a birthright member of Evesham Monthly Meeting, the
              son of Robert Hunt and his first wife Abigail. The later printed
              version of Hunt’s journal contains a brief autobiographical
              fragment which is not included in the manuscript original:
            </span>
          </p>
          <p class="c12">
            <span class="c10 c29">
              At divers times in my very youthful days, and particularly when
              about eight years of age, I was favored with the tendering
              visitations of Divine goodness; the effects of which were marked
              in my countenance and deportment, so as to attract the notice of
              my friends. And afterward as I grew up, and before I was of age, I
              used sometimes to seek places of retirement, and spend the
              afternoons of first-days in reading the scriptures and other
              religious books; refusing to go into company—and in so doing I
              felt the reward of peace. But not abiding in this tender watchful
              state, I gave way again and again, to go into unprofitable
              company; and sometimes spent the first-days in a way which brought
              trouble, and cost me many tears in solitary corners.{" "}
            </span>
            <sup class="c8 c29">
              <a href="#ftnt6" id="ftnt_ref6">
                [6]
              </a>
            </sup>
          </p>
          <p class="c0">
            <span class="c9">
              Begun in 1770, Hunt’s journal recorded his day to day work life,
              family events, his own spiritual state of mind and that of the
              meetings he attended, and local and national events.
            </span>
          </p>
          <p class="c0">
            <span class="c9">
              The bulk of the early entries revolve around farming his own
              property and working as a rural joiner. Interestingly, the journal
              also functioned as an account book, listing his customers and
              whether their accounts were current. Hunt turned wooden pumps of
              various sizes but also supplied plows, cradles, coffins, and
              benches, the usual products of a local craftsman. On the farm and
              in his shop he was sometimes aided by his sons, apprentices,
              indentured servants, and hired help. Patterns of work were
              dictated by the seasons. During September of 1770, for instance,
              he recorded days spent putting up an apple mill, trimming casks,
              making furniture, going to the mill, husking and hauling corn,
              splicing pumps, getting firewood, picking winter apples, and other
              regular chores.
            </span>
          </p>
          <p class="c0">
            <span class="c9">
              While the first years are largely an accounting of his working
              life, Hunt becomes increasingly interested in documenting his
              spiritual progress as well, a sort of confession of faith. He
              records his participation in what seems like an endless series of
              Quaker meetings for worship and for business. After he was
              recognized as a minister in 1783, his activities on behalf of the
              Religious Society of Friends expanded and the journal reveals much
              of the customs and practices of the Quakers in the Delaware Valley
              in the late 18th and early 19th centuries.
            </span>
          </p>
          <p class="c0">
            <span class="c9">
              Hunt’s journal is not myopically focused on personal or even
              Quaker concerns; Hunt also records information about his wider
              world. In 1798, for instance, he noted, “We hear that the yellow
              fever is very mortal in Philadelphia and that the greater part of
              the inhabitants is fled and that it is in Burlington and likewise
              in New York they are moving out and that it is at Morris’s River
              very mortal – twelve died in eleven days. And we hear that divers
              have died on the highways, in the wood, barns and at Moorestown
              several were buried last week with the disorder.” A constant theme
              in Hunt’s writing is, in fact, the fragility of life; stories of
              thunder (lightning) strikes, fires, drownings, sickness, and other
              mortal disasters are all duly noted. While Hunt made no reference
              to the issues behind the American Revolution, he did write that
              the soldiers occupied his meetinghouse several times and used it
              as a hospital. The armies attempted to impress Quaker wagons for
              the use of the troops. The sounds of the Battle of the Brandywine
              (fought in Chester County, Pennsylvania on September 11, 1777) and
              the Battle of Germantown (north of Philadelphia) were heard in New
              Jersey. Later the sounds of soldiers marching could be heard in
              the meetinghouse.{" "}
            </span>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Intro;
