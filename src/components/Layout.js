import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Header from "./Header";
import Footer from "./Footer";
import {Container, Row, Col} from "react-bootstrap"
import "../assets/styles/styles.scss";
import Nav from './Nav'


const Layout = (props) => {
  return (
    <Container fluid>
        <Nav></Nav>
        <Header></Header>
        {props.children}
        <Footer></Footer>
    </Container>
  );
};
//TODO: Style this component
export default Layout;
