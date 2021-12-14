import React from "react";
import {useState} from 'react'
import { Link } from "gatsby";
import { FaBars } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { globalVariables } from "../globalVariables";
import "../styles/styles.scss";
import "../styles/header.scss";

import { Row, Col, Dropdown} from "react-bootstrap";


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
        <Link className="g-link" to={globalVariables.home}>
          <AiOutlineHome id="home-icon" size={40}></AiOutlineHome>
        </Link>

        <Link className="g-link" to={globalVariables.journals}>
          <div className="d-flex header-item" id="header-journal">
            <h4>Journals</h4>
          </div>
        </Link>
        <Link className="g-link" to={globalVariables.people}>
          <div className="d-flex header-item" id="header-relative">
            <h4>People</h4>
          </div>
        </Link>
        <Link className="g-link" to={globalVariables.network}>
          <div className="d-flex header-item" id="header-network">
            <h4>Network</h4>
          </div>
        </Link>
        <Dropdown className="g-link">
          <Dropdown.Toggle
            className="header-dropdown header-item"
            id="dropdown-background"
          >
            <h4>Context</h4>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              className="d-flex header-item"
              id="header-background"
              href=""
            >
              <Link
                className="g-link dropdown-link"
                to={globalVariables.author_bg}
              >
                John Hunt
              </Link>
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex header-item"
              id="header-background"
              href=""
            >
              <Link
                className="g-link dropdown-link"
                to={globalVariables.quaker_bg}
              >
                Quakers
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="g-link">
          <Dropdown.Toggle
            className="header-dropdown header-item"
            id="dropdown-about"
          >
            <h4>About</h4>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              className="d-flex header-item"
              id="header-background"
              href=""
            >
              <Link className="g-link dropdown-link" to={globalVariables.about}>
                About
              </Link>
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex header-item"
              id="header-background"
              href=""
            >
              <Link
                className="g-link dropdown-link"
                to={globalVariables.contact}
              >
                Contact
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default Header;
