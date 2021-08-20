import React from "react";
import "../assets/styles/background.scss";
import { Row, Col } from "react-bootstrap";
// const appendixData = require("../../../assets/data/john_hunt_appendix.json");

const Glossary = () => {
  // const term = (term) => (
  //   <p className="background-text">
  //     <strong>{term.term}</strong>: {term.definition}
  //   </p>
  // );
  return (
    <Row>
      <Col className="background-col">
        <br />
        <h4 className="background-text">Background: Terms</h4>
        <div className="appendix-text" id="quaker-glossary">
          {/* <h6 className="background-text">Terms: </h6>
            <br />
            {appendixData.appendixB.terms.map(term)} */}
          <h2 class="c8 c30" id="h.r07dnzyj1d4v">
            <span class="c12">Terminologies involved within the context of Quakerism</span>
          </h2>
          <p class="c5">
            <span class="c11 c13 c14">Acknowledgement</span>
            <span class="c4">
              &nbsp;— A formal, written statement of apology by an offending
              member to the meeting for having acted in a manner contrary to the
              rules of discipline.
            </span>
          </p>
          <p class="c5">
            <span class="c11 c13 c14">Birthright member</span>
            <span class="c4">
              &nbsp;— A person whose parents are both members of the Society of
              Friends, thus making the person a Friend from birth.
            </span>
          </p>
          <p class="c5">
            <span class="c11 c13 c14">Certificate of Removal</span>
            <span class="c4">&nbsp;— see under Removal. </span>
          </p>
          <p class="c5">
            <span class="c11 c13 c14">Convinced Friend</span>
            <span class="c4">
              &nbsp;— A person who is not a birthright Friend who joins the
              Society.{" "}
            </span>
          </p>
          <p class="c5">
            <span class="c11 c13 c14">Disownment</span>
            <span class="c4">
              &nbsp;— The involuntary termination of membership in a meeting,
              when a member of a meeting acts contrary to established
              discipline. &nbsp;Reasons for disownment have changed over time,
              often reflecting contemporary societal mores. &nbsp;Today, very
              few people are disowned.{" "}
            </span>
          </p>
          <p class="c5">
            <span class="c11 c13 c14">Elders</span>
            <span class="c4">
              &nbsp;— A small group of men and women appointed to assist and
              also oversee the ministers. &nbsp;There were monthly, quarterly,
              and yearly meetings of ministers and elders to oversee the
              spiritual life of the Society of Friends.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c4">
              Quarterly Meeting. &nbsp;These meetings are under the jurisdiction
              of a yearly meeting. &nbsp;Half-Yearly Meetings were established
              where distance between meetings made more frequent gathering
              difficult.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Indulged meeting</span>
            <span class="c4">
              &nbsp;— A newly formed meeting for worship which requests and is
              granted the care and oversight of a local monthly meeting.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Laid down</span>
            <span class="c4">
              &nbsp;— Term used to denote the official discontinuance of a
              meeting.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Meeting for Sufferings</span>
            <span class="c4">
              &nbsp;— A committee first appointed in 1756 by Philadelphia Yearly
              Meeting to raise and administer relief to Friends who suffered
              distress as a result of Indian conflicts or governmental
              persecution. &nbsp;Similar bodies were established by other
              American yearly meetings. Later, quarterly and monthly meetings
              appointed committees to assist Friends who encountered hardships
              due to their opposition to war and slavery. &nbsp;The Meetings for
              Sufferings also maintained contact with their counterpart in
              London that had been organized in 1676. &nbsp;The Meeting for
              Sufferings acted for the Yearly Meeting between sessions and later
              developed into Representative Meeting of the Yearly Meeting.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Memorials</span>
            <span class="c4">
              &nbsp;— On the death of a minister or other important member, the
              monthly meeting might prepare a brief biography testifying to the
              spiritual value of this life. &nbsp;The memorial was read at the
              monthly meeting and forwarded to the quarterly and/or yearly
              meeting. Yearly Meetings also periodically published printed books
              of memorials, particularly in the second half of the 19th century.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Ministers</span>
            <span class="c4">
              &nbsp;— Historically, men and women who were recognized as being
              unusually inspired by the Spirit of God and provided most of the
              vocal messages in meeting for worship. &nbsp;Ministers were
              formally designated or “recorded” by the monthly meeting, and
              regular meetings of ministers and elders, called Preparative
              Meetings of Ministers and Elders or Select Meeting were held to
              consider the spiritual life of the meeting. &nbsp;The practice of
              “recording” ministers has for the most part been discontinued
              today.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Opportunity</span>
            <span class="c4">
              &nbsp;-- An opportunity for a religious visit to families or to
              speak in meeting for worship.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Overseer</span>
            <span class="c4">
              &nbsp;— A member of committee of overseers responsible for the
              welfare and discipline of members of the monthly meeting.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Particular meeting</span>
            <span class="c4">
              &nbsp;— A formally established meeting for worship under the care
              of a monthly meeting.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Queries</span>
            <span class="c4">
              &nbsp;— A set of questions, revised periodically, which were to be
              answered in writing by preparative, monthly, and quarterly
              meetings and reported to the Yearly Meeting. &nbsp;The queries
              concern conduct of individuals and practices of the meetings and
              provide one means of assuring uniformity in discipline.
              &nbsp;Meetings of ministers and elders also responded to queries.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Removal</span>
            <span class="c4">
              &nbsp;— A certificate of removal is a document given to persons
              who are transferring their membership from one monthly meeting to
              another. &nbsp;Their removal testifies that they are members in
              good standing with the meetings they are leaving.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Select Meeting</span>
            <span class="c4">
              &nbsp;-- Select meetings were limited to designated participants.
              This usually refers to the meeting of ministers and elders.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Sitting</span>
            <span class="c4">
              &nbsp;-- A religious visit, generally to a family.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Testimonies</span>
            <span class="c4">
              &nbsp;— Traditionally, Quakers developed a series of specific
              practices, often called testimonies, that expressed ethical
              conduct of truthfulness, simplicity, equality, and peace.
              &nbsp;Testimonies include rejection of oaths, use of “thee” and
              “thou” in speech, plain dress, refusal to take off hats to social
              superiors, equality of men and women, opposition to slavery, and
              refusal to bear arms. &nbsp;Testimonies also can refer to official
              documents, frequently disownments and memorials, prepared by
              Quaker business meetings as part of what they considered
              witnessing to truth.
            </span>
          </p>
          <p class="c8 c15">
            <span class="c11 c13 c14">Traveling certificate or minute</span>
            <span class="c4">
              &nbsp;— A document issued by a meeting to a member in good
              standing (normally a recorded minister), allowing him or her to
              travel to other meetings to visit or preach.{" "}
            </span>
          </p>
          <p class="c8 c15">
            <span class="c4">
              Women’s meeting — Separate business meetings for women alongside
              the men’s meetings were held by preparative, monthly, quarterly,
              and yearly meetings. &nbsp;Women appointed representatives,
              communicated with other women’s meetings, granted or received
              certificates of removal, approved marriages for women members.
              &nbsp;The men’s meeting rarely overruled the women’s meetings on
              removals, marriages or questions regarding matters of discipline.
              &nbsp;Gradually, beginning late in the 19th century, men and women
              began meeting jointly to conduct business.
            </span>
          </p>
          <p class="c8 c32">
            <span class="c4"></span>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Glossary;
