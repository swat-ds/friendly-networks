import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { menuData } from "../assets/data/MenuData";
import "../assets/styles/styles.scss";
import "../assets/styles/header.scss";

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Container,
  Button,
  Row,
  Col,
} from "react-bootstrap";

const Header = (props) => {
  return (
    <Row>
      <Col bsPrefix="col header-items">
        <Link className="g-link" to="/journals">
          <div className="d-flex header-item" id="header-journal">
            <h1>Journals</h1>
          </div>
        </Link>
        <Link className="g-link" to="/people">
          <div className="d-flex header-item" id="header-relative">
            <h1>People</h1>
          </div>
        </Link>
        <Link className="g-link" to="/network">
          <div className="d-flex header-item" id="header-network">
            <h1>Network</h1>
          </div>
        </Link>
        <Link className="g-link" to="/timeline">
          <div className="d-flex header-item" id="header-timeline">
            <h1>Timeline</h1>
          </div>
        </Link>
      </Col>
    </Row>
  );
};

export default Header;
