import React from "react";
import styled from "styled-components";
import {Row, Col} from 'react-bootstrap'
import "../assets/styles/footer.scss"
import swat_logo from "../assets/images/swarthmore-college-logo.png"

const Footer = (props) => {
  return (
    <Row >
      <Col>
        <footer className="text-center">
          <a href="https://www.swarthmore.edu/">Swarthmore College</a>
          This site is created by Friends Historical Library @ Swarthmore
          College
          <p>
            Copyright &copy; {new Date().getFullYear()} FHL. All Rights are
            Reserved
            <span>
              <a href="https://www.swarthmore.edu/friends-historical-library">
                FHL
              </a>
            </span>
          </p>
        </footer>
      </Col>
    </Row>
  );
};
//TODO: Style this component
  
export default Footer;
