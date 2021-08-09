import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Header from "./Header";
import {Container, Row, Col} from "react-bootstrap"
import "../assets/styles/styles.scss";
import NavBar from './NavBar';
import Footer from './Footer';

/**
 * 
 * @param {*} props contains all the properties that maybe passed to Footer. 
 * @returns a @Container element containing multiple components, all can be found 
 * under 'components' folder. Any children passed will be spread inside
 */
const Layout = (props) => {
  return (
    <Container id="main-container" fluid>
        <NavBar></NavBar>
        <Header></Header>
        {props.children}
        <Footer></Footer>
    </Container>
  );
};
export default Layout;
