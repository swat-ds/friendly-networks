import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Header from "./Header";
import {Container, Row, Col} from "react-bootstrap"
import "../assets/styles/styles.scss";
import NavBar from './Nav';
import TestFooter from './TestFooter';

/**
 * 
 * @param {*} props contains all the properties that maybe passed to Footer. 
 * @returns a @Container element containing multiple components, all can be found 
 * under 'components' folder. Any children passed will be spread inside
 */
const Layout = (props) => {
  return (
    <Container fluid>
        <NavBar></NavBar>
        <Header></Header>
        {props.children}
        <TestFooter></TestFooter>
    </Container>
  );
};
export default Layout;
