import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Header from "./Header";
import Footer from "./Footer";
import {Container, Row, Col} from "react-bootstrap"
import "../assets/styles/styles.scss";
import Nav from './Nav'


/**
 * 
 * @param {*} props contains all the properties that maybe passed to Footer. 
 * @returns a @Container element containing multiple components, all can be found 
 * under 'components' folder. Any children passed will be spread inside
 */
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
export default Layout;
