import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Header from "./Header";
import Footer from "./Footer";
import { GlobalStyles } from "../styles/GlobalStyles";


const Layout = (props) => {
  return (
    <Wrapper className="layout">
      <GlobalStyles></GlobalStyles>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </Wrapper>
  );
};
//TODO: Style this component
const Wrapper = styled.main`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  z-index: 1000;
  border: thin solid maroon;
`;
export default Layout;
