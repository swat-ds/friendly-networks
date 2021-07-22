import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { menuData } from "../assets/data/MenuData";
import "../assets/styles/styles.scss";
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

const styles = (color) => {
  return {
    backgroundColor: color,
    border: "thin solid #077487",
    borderRadius: "5px",
  };
};
const Header = (props) => {
  return (
    <Row>
      <Col style={styles("#0ba334")}>Image</Col>

      <Col style={styles("#db7107")}>
        <Button variant="outline-info">
          <Link to="/journals">Journals</Link>
        </Button>
      </Col>
      <Col style={styles("#0694d1")}>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-5" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Col>
      <Col style={styles("#700b85")}>
        <Button variant="outline-info">
          <Link to="/about">About</Link>
        </Button>
        <Button variant="outline-info">
          <Link to="/contact">Contact</Link>
        </Button>
        <Button variant="outline-info">Español</Button>
      </Col>
    </Row>
  );
};

export default Header;
