import React from "react";
import { useState } from "react";
import { Link, navigate } from "gatsby";
import { AiOutlineHome } from "react-icons/ai";
import "../styles/styles.scss";
import "../styles/nav.scss";
import logo from "../../content/assets/images/Logo.png";
import background from "../../content/assets/images/HuntSiteHeader.jpg";
import { globalVariables } from "../globalVariables";

import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Dropdown,
  Container
} from "react-bootstrap";

//style={{display:"flex", flexDirection: "row", justifyContent: "space-between" }}
/**
 *
 * @param {*} props contains all the properties that maybe passed to Footer.
 * @returns a @Row element containing a @Col which contains some nav elements
 */
const NavBar = (props) => {


 //the state that will be passed to search page upon the click of the Link
 //the 'searchQuery' is being destructured in the search.js
  const [query, setQuery] = useState("");

  //takes the input value and set it to be the value of property 'searchQuery' in the state
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  //when pressed Enter key, the state will be set and programmatically trigger the click of the Link
  function handleSubmit(e) {
    e.preventDefault();
    // Go to new page
    navigate(`/search?q=${query}`, {state: {searchQuery: query}} )

  }

  const bgStyle = {backgroundImage: 'url(' + background + ')',};

  return (
    <>
      <Row id="nav-image" style={bgStyle}>
        <Col>
          <img id="logo" src={logo} alt="Friendly Networks logo"></img>
        </Col>
        <Col className="search-form">
          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Search"
              className=" form-box mr-2"
              aria-label="Search"
              onChange={handleChange}
            />
            <Button type="submit" variant="primary" className="g-link" id="search-button">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <Row id="nav-row">
        <Navbar expand="md" variant="dark" id="navbar" >
            <Navbar.Brand
              as={Link}
              id="brand"
              to="/"
              className="header-item"
            >
              <AiOutlineHome id="home-icon" size={40}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-collapse" />
            <Navbar.Collapse id="navbar-collapse">
              <Nav className="justify-content-around nav-nav">
                <Nav.Item>
                  <Nav.Link as={Link}
                    to="/writings"
                    activeClassName="active"
                    partiallyActive={true}
                  >
                    Writings
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link}
                    to="/people"
                    activeClassName="active"
                    partiallyActive={true}
                  >
                    People
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/network" activeClassName="active">
                    Network
                  </Nav.Link>
                </Nav.Item>
                <NavDropdown title="Background" id="background-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    activeClassName="active"
                    to="/background/hunt-bg"
                  >
                    John Hunt
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    activeClassName="active"
                    to="/background/evans-bg"
                  >
                    Joshua Evans
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    activeClassName="active"
                    to="/background/quaker-bg"
                  >
                    Quakers
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Project" id="about-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    activeClassName="active"
                    to="/about"
                  >
                    About
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    activeClassName="active"
                    to="/credits"
                  >
                    Credits
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </Row>
    </>
  );
};

export default NavBar;
