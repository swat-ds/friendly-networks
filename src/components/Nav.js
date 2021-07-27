import React from "react";
import { Link } from "gatsby";
import { FaBars } from "react-icons/fa";
import "../assets/styles/styles.scss";
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

      <Col md={{ offset: 5 }}>
        <Link to="/about">
          <Button variant="outline-info">
            About
          </Button>
        </Link>

        <Link to="/contact">
          <Button variant="outline-info">
            Contact
          </Button>
        </Link>

        <Button variant="outline-info" id="spanish">
          Español
        </Button>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-5" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Header;
