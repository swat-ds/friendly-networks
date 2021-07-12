import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { menuData } from "../assets/data/MenuData";
import Button from 'react-bootstrap/Button'
import {
  Navbar,
   Nav, 
  Form, 
FormControl} from 'react-bootstrap'

const Header = (props) => {
  return (
    <Div>
      <div id="logo-container">
        <img src="../assets/images/logo.png" alt="" />
      </div>
      <div id="nav-menu">
        <button className="menu-btn">
          <Link to="/journals">Journals</Link>
        </button>
      </div>
      <Bars />
      <Info>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
      </Info>
    </Div>
  );
};

const Div = styled.div`
  position: relative;
  background: #0b8ab8;
  height: 80px;
  display: flex;
  border-bottom: thick solid orange;

  justify-content: space-between;
  padding: 0.5rem calc((100vw -1300vw) / 2);
  z-index: 100;

  #logo-container {
    position: absolute;
    color: white;
    height: 100%;
    width: 5rem;
    top: 0px;
    left: 0px;
  }

  #logo-container img {
    height: inherit;
    width: inherit;
  }

  #nav-menu {
    position: absolute;
    border: thin solid blue;
    width: 40rem;
    height: 3rem;
    top: 25px;
    left: 12rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #nav-menu .menu-btn{
    height: 2rem;
    width: 6rem;
    color: white;
    background: none;

  }
`;

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;
const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
const Info = styled.div`
position: absolute;
  display: flex;
  align-items: center;
  border: thin solid blue;
  padding: 5px;
  right: 10rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default Header;
