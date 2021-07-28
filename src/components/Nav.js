import React from "react";
import { Link } from "gatsby";
import { FaBars } from "react-icons/fa";
import "../assets/styles/styles.scss";
import "../assets/styles/nav.scss";
import logo from '../assets/images/logo.jpeg'
import {
  Form,
  FormControl,
  Container,
  Button,
  Row,
  Col,
  Image
} from "react-bootstrap";

const Header = (props) => {
  return (
    <Row>
      <Col>
        <Link to="/">
          <Image id="logo" src={logo} roundedCircle></Image>
        </Link>
      </Col>

      <Col xs={5} md={{ offset: 5 }} >
        <div
          className="container-fluid "
          id="nav-items"
        >
          <Link className="g-link" to="/about">
            About
          </Link>

          <Link className="g-link" to="/contact">
            Contact
          </Link>
          <Button
            variant="outline-info"
            className="float-right"
            style={{ float: "right" }}
            id="spanish"
          >
            Español
          </Button>
        </div>

        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </Col>
    </Row>
  );
};

export default Header;
