import React from "react";
import {useState} from 'react'
import { Link } from "gatsby";
import { FaBars } from "react-icons/fa";
import "../assets/styles/styles.scss";
import "../assets/styles/nav.scss";
import logo from '../assets/images/logo.jpeg'
import { pageLinks } from "../assets/data/globalVariables"

import {
  Form,
  FormControl,
  Container,
  Button,
  Row,
  Col,
  Image,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";

//style={{display:"flex", flexDirection: "row", justifyContent: "space-between" }}
/**
 * 
 * @param {*} props contains all the properties that maybe passed to Footer. 
 * @returns a @Row element containing a @Col which contains some nav elements
 */
const NavBar = (props) => {
return (
  <Row id="nav-row">
    <Col>
      <img src={logo} style={{ height: "8vh" }}></img>
    </Col>
    <Col>
      <Navbar expand="lg">
        <Navbar.Brand id="brand">Menu</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <div id="explore">
              <Link className="g-link" to={pageLinks.home}>
                Home
              </Link>
              <Link className="g-link" to={pageLinks.about}>
                About
              </Link>
              <Link className="g-link" to={pageLinks.contact}>
                Contact
              </Link>
            </div>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <div className="header-items-mobile">
            <Link className="g-link" to="/journals">
              <div className="header-item" id="header-journal-mobile">
                Journal
              </div>
            </Link>
            <Link className="g-link" to="/people">
              <div className="header-item" id="header-relative-mobile">
                People
              </div>
            </Link>
            <Link className="g-link" to="/network">
              <div className="header-item" id="header-network-mobile">
                Network
              </div>
            </Link>
            <Link className="g-link" to="/timeline">
              <div className="header-item" id="header-timeline-mobile">
                Timeline
              </div>
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </Col>
  </Row>
);
};

export default NavBar;
