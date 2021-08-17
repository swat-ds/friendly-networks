import React from "react";
import Layout from "../../components/Layout";
import { Link } from "gatsby";
import "../../assets/styles/pageStyles.scss";
import { globalVariables } from "../../assets/data/globalVariables";

import {Row, Col} from "react-bootstrap"

const background = () => {
    return (
      <Layout>
        <Row>
          <Col id="background-items">
            <h2>
              Background information of the author and the related subjects
            </h2>
            <Link className="g-link" to={globalVariables.timeline}>
              <div className="d-flex background-item" id="background-timeline">
                <h3>Timeline</h3>
                <p>Highlights some of the key events occurred in a chronological manner </p>
              </div>
            </Link>
            <Link className="g-link" to={globalVariables.essay}>
              <div className="d-flex background-item" id="background-essay">
                <h3>Essay</h3>
              </div>
            </Link>
            <Link className="g-link" to={globalVariables.bibliography}>
              <div
                className="d-flex background-item"
                id="background-bibliography"
              >
                <h3>Bibliography</h3>
              </div>
            </Link>
            <Link className="g-link" to={globalVariables.quaker_glossary}>
              <div
                className="d-flex background-item"
                id="background-quaker-glossary"
              >
                <h3>Quaker Glossary</h3>
              </div>
            </Link>
            <Link
              className="g-link"
              to={globalVariables.quaker_meeting_structure}
            >
              <div
                className="d-flex background-item"
                id="background-quaker-meeting-structure"
              >
                <h3>Quaker Meeting Structures</h3>
              </div>
            </Link>
          </Col>
        </Row>
      </Layout>
    );
};

export default background;
