import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, navigate } from "gatsby";
import { FaBars } from "react-icons/fa";
import "../assets/styles/styles.scss";
import "../assets/styles/nav.scss";
import logo from "../assets/images/HuntSiteLogoRough.png";
import { globalVariables } from "../assets/data/globalVariables";

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
  Dropdown
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
  //to refer to the Link to trigger click when pressed Enter key. 
  const linkRef = useRef();

  //takes the input value and set it to be the value of property 'searchQuery' in the state
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  //wheen pressed Enter key, the state will be set and programmatically trigger the click of the Link
  //TODO: not working, goes to the search page but comes back to /?
  function handleSubmit(e) {
    e.preventDefault();
    // Go to new page
    navigate('/search?', {state: {searchQuery: query}} )

  }

  return (
    <>
      <Row id="nav-image">
        <Col>
          <img id="logo" src={logo}></img>
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
            <Button type="submit" variant="success">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <Row id="nav-row">
        <Col>
          <Navbar expand="lg">
            <Navbar.Brand id="brand">Menu</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              {/* <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="mr-2"
                  aria-label="Search"
                  onChange={handleChange}
                />
                <Link to={"/search"} state={{ searchQuery: query }}>
                  <Button variant="outline-success">Search</Button>
                </Link>
              </Form> */}
              <div className="header-items-mobile">
                <Link className="g-link" to={globalVariables.journals}>
                  <div className="header-item" id="header-journal-mobile">
                    Journal
                  </div>
                </Link>
                <Link className="g-link" to={globalVariables.people}>
                  <div className="header-item" id="header-relative-mobile">
                    People
                  </div>
                </Link>
                <Link className="g-link" to={globalVariables.network}>
                  <div className="header-item" id="header-network-mobile">
                    Network
                  </div>
                </Link>
                <Dropdown>
                  <Dropdown.Toggle
                    style={{ height: "5vh" }}
                    className="header-dropdown"
                    variant="outline-success"
                    id="dropdown-basic"
                  >
                    Background
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="d-flex header-item"
                      id="header-background-mobile"
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
                      id="header-background-mobile"
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
                      id="header-background-mobile"
                      href=""
                    >
                      <Link
                        className="g-link dropdown-link"
                        to={globalVariables.about}
                      >
                        about
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="d-flex header-item"
                      id="header-background-mobile"
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
              </div>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </>
  );
};

export default NavBar;
