import React from "react";
import { Link } from "gatsby";
import Layout from "../../../components/Layout";
import { globalVariables } from "../../../assets/data/globalVariables";
import { Row, Col, Button } from "react-bootstrap";
import "../../../assets/styles/pageStyles.scss";


const author_bg = () => {
  return (
    <Layout>
      <Row id="main-row">
        <Col id="author-bg-col">
          <h2>Backgrounds of John Hunt</h2>
          <Link className="g-link2" to="/background/author-bg/timeline">
            <div className="box cyan">
              <h2>Timeline</h2>
              <p>
                A timeline of events occurred in John Hunt and his families
                lives, both visual and text formats
              </p>
            </div>
            {/* <Button variant="outline-success">Timeline</Button> */}
          </Link>
          <Link className="g-link2" to="/background/author-bg/bibliography">
            {/* <Button variant="outline-success">Bibliography</Button> */}
            <div className="box red">
              <h2>Bibliography</h2>
              <p>Bibliography for the reference of this essay</p>
            </div>
          </Link>
          <Link className="g-link2" to="/background/author-bg/world">
            {/* <Button variant="outline-success">World of John Hunt</Button> */}
            <div className="box blue">
              <h2>World of John Hunt</h2>
              <p>
                Brief descriptive summary of how John Hunt lived is life,
                including his daily routines, practices, and other involvements{" "}
              </p>
            </div>
          </Link>
          <Link className="g-link2" to="/background/author-bg/family">
            {/* <Button variant="outline-success">Family</Button> */}
            <div className="box orange">
              <h2>John Hunt's Family</h2>
              <p>
                Descriptions and charts of John Hunt's immediate and extended
                family members
              </p>
            </div>
          </Link>
          <Link className="g-link2" to={globalVariables.boo}>
            {/* <Button variant="outline-success">Bookshelf</Button> */}
            <div className="box cyan">
              <h2>John Hunt's Bookshelf</h2>
              <p>
                Which texts had John Hunt read and incorporated as he wrote his
                journals
              </p>
            </div>
          </Link>
          <Link className="g-link2" to="/background/author-bg/dear_friends">
            {/* <Button variant="outline-success">Friends</Button> */}
            <div className="box red">
              <h2>Dear Friends</h2>
              <p>
                Some of the people John Hunt venerated, lived among, and
                exchanged dialogues with
              </p>
            </div>
          </Link>
          <Link className="g-link2" to="/background/author-bg/all">
            {/* <Button variant="outline-success">All in One</Button> */}
            <div className="box blue">
              <h2>The Entire Essay</h2>
              <p>
                Click on this one to view the entire essay, timeline,
                bibliography, etc.{" "}
              </p>
            </div>
          </Link>
        </Col>
      </Row>
    </Layout>
  );
};

export default author_bg;
