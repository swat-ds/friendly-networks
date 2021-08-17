import React from "react";
import {useState} from 'react'
import { Link } from "gatsby";
import { FaBars } from "react-icons/fa";
import { globalVariables } from "../assets/data/globalVariables";
import "../assets/styles/styles.scss";
import "../assets/styles/header.scss";

import { Row, Col, DropdownButton } from "react-bootstrap";


/**
 * 
 * @param {*} props contains all the properties that maybe passed to Footer. 
 * @returns a @Row element containing a @Col which contains multiple @GatsbyJS @Links
 */
const Header = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const toggleOpen = () => setDropdown(!dropdown);

  return (
    <Row id="header-row">
      <Col bsPrefix="col header-items">
        <Link className="g-link" to={globalVariables.journals}>
          <div className="d-flex header-item" id="header-journal">
            <h3>Journals</h3>
          </div>
        </Link>
        <Link className="g-link" to={globalVariables.people}>
          <div className="d-flex header-item" id="header-relative">
            <h3>People</h3>
          </div>
        </Link>
        <Link className="g-link" to={globalVariables.network}>
          <div className="d-flex header-item" id="header-network">
            <h3>Network</h3>
          </div>
        </Link>
        <Link className="g-link" to={globalVariables.background}>
          <div className="d-flex header-item" id="header-background">
            <h3>Background</h3>
          </div>
        </Link>
      </Col>
    </Row>
  );
};

export default Header;
