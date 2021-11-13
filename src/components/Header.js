import React from "react";
import {useState} from 'react'
import { Link } from "gatsby";
import { FaBars } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { globalVariables } from "../assets/data/globalVariables";
import "../assets/styles/styles.scss";
import "../assets/styles/header.scss";

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
        <Dropdown>
          <Dropdown.Toggle
            style={{ height: "6vh" }}
            className="header-dropdown"
            variant="outline-success"
            id="dropdown-basic"
          >
            Background
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
                john Hunt
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

        <Dropdown>
          <Dropdown.Toggle
            style={{ height: "6vh" }}
            className="header-dropdown"
            variant="outline-success"
            id="dropdown-basic"
          >
            About
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              className="d-flex header-item"
              id="header-background"
              href=""
            >
              <Link className="g-link dropdown-link" to={globalVariables.about}>
                about
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
                contact
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default Header;
