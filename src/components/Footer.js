import React from "react";
import {Row, Col} from 'react-bootstrap'
import "../assets/styles/footer.scss"

/**
 * 
 * @param {*} props contains all the properties that maybe passed to Footer. 
 * @returns a @Row element containing a @Col which contains an @footer
 */
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

export default Footer;
