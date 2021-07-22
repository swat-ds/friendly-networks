import React from "react";
import styled from "styled-components";
import {Row, Col} from 'react-bootstrap'
import "../assets/styles/footer.scss"

const Footer = (props) => {
  return (
      <Row>
        <Col>
          <footer>
            Created by Digital Scholarship @ Swarthmore College All Rights are
            Reserved
          </footer>
        </Col>
      </Row>
  );
};
//TODO: Style this component
  
export default Footer;
