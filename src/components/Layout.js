import React from "react";
import {Container} from "react-bootstrap"
import "../styles/styles.scss";
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
        <NavBar/>
        {props.children}
        <Footer></Footer>
    </Container>
  );
};
export default Layout;
