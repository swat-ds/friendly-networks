import React from "react";
import {Link} from 'gatsby'
import {
    Row
} from 'react-bootstrap';
import {globalVariables, contacts} from '../globalVariables'
import '../styles/styles.scss'
import "../styles/footer.scss";

const Footer = () => {

  // See "contacts" in globalVariables.js for the structure of parameters
  const renderContactInfo = (contactJson) => {
    return (
      <p className="contactInfo">
      {contactJson.name}
      <br/>{contactJson.address1}
      <br/>{contactJson.address2}
      <br/>{contactJson.address3}
      <br/><a href={contactJson.website}>{contactJson.name} Website</a>
      </p>
    );
  };

  return (
    <Row id="footer-row">
      <footer className="text-center text-lg-start text-muted" id="footer">
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {renderContactInfo(contacts.ds)}
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {renderContactInfo(contacts.fhl)}
              </div>

            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <p>
                <Link to={globalVariables.home} className="g-link ">
                  Home
                </Link>
                <Link to={globalVariables.about} className=" g-link ">
                  About
                </Link>
                <Link to={globalVariables.contact} className="g-link ">
                  Contact
                </Link>
              </p>
            </div>

          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          <span>&copy; {new Date().getFullYear()} Copyright </span>
          <a
            className="g-link fw-bold"
            href="https://www.swarthmore.edu/libraries/digital-scholarship"
          >
            Swarthmore Digital Scholarship
          </a>
        </div>
      </footer>
    </Row>
  );
};

export default Footer;
