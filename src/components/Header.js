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

const Header = (props) => {
  return (
    <Row>
      <Col style={{ backgroundColor: "#8a8686" }}>
        <Link to="/journals" className="gatsby-link">
          <Button variant="outline-info">Journals</Button>
        </Link>
        <Link to="/relatives" className="gatsby-link">
          <Button variant="outline-info">Relatives</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default Header;
