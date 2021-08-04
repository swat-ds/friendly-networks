import React from "react";
import { Link } from "gatsby";
import { FaBars } from "react-icons/fa";
import { pageLinks } from "../assets/data/pageLinks";
import "../assets/styles/styles.scss";
import "../assets/styles/header.scss";

import {
  Row,
  Col,
} from "react-bootstrap";


/**
 * 
 * @param {*} props contains all the properties that maybe passed to Footer. 
 * @returns a @Row element containing a @Col which contains multiple @GatsbyJS @Links
 */
const Header = (props) => {
  return (
    <Row style={{ backgroundColor: "#2F3242" }}>
      <Col bsPrefix="col header-items">
        <Link className="g-link" to={pageLinks.journals}>
          <div className="d-flex header-item" id="header-journal">
            <h3>Journals</h3>
          </div>
        </Link>
        <Link className="g-link" to={pageLinks.people}>
          <div className="d-flex header-item" id="header-relative">
            <h3>People</h3>
          </div>
        </Link>
        <Link className="g-link" to={pageLinks.network}>
          <div className="d-flex header-item" id="header-network">
            <h3>Network</h3>
          </div>
        </Link>
        <Link className="g-link" to={pageLinks.timeline}>
          <div className="d-flex header-item" id="header-timeline">
            <h3>Timeline</h3>
          </div>
        </Link>
      </Col>
    </Row>
  );
};

export default Header;
