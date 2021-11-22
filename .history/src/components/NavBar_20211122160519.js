import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
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


  const [searchObj, setSearchOBj] = useState({searchQuery: ""});
  const linkRef = useRef();

  const handleChange = (e) => {
    setSearchOBj({searchQuery: e.target.value});
  };

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setSearchOBj({ searchQuery: e.target.value });
      // console.log(searchObj);
      console.log(linkRef.current.click());
      {props.history.push('/link')}}
    }
  }
  function handleClick() {
  }

  return (
    <>
      <Row id="nav-image">
        <Col>
          <img id="logo" src={logo}></img>
        </Col>
        <Col className="search-form">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className=" form-box mr-2"
              aria-label="Search"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <Link
              to={"/search"}
              state={searchObj}
              ref={linkRef}
            >
              <Button variant="success">Search</Button>
            </Link>
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
