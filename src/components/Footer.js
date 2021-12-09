import React from "react";
import {Link} from 'gatsby'
import {
    Row
} from 'react-bootstrap';
import {globalVariables, contacts} from '../globalVariables'
import '../styles/styles.scss'
import "../styles/footer.scss";

const Footer = () => {
  return (
    <Row id="footer-row">
      <footer className="text-center text-lg-start text-muted" id="footer">
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Friends Historical Library
                </h6>
                <p className="footer-description">
                  A library dedicated to the preservation of Friends historical
                  literature. Associated with the McCabe Library of Swarthmore
                  College. Located on the left side of the front desk respective
                  to entering the building.
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
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
                <p>
                  <Link to={globalVariables.swat} className="g-link ">
                    Swarthmore College
                  </Link>
                </p>
                <p>
                  <Link to={globalVariables.fhl} className="g-link ">
                    Friends Historical Library
                  </Link>
                </p>
                <p>
                  <Link to={globalVariables.lib} className="g-link ">
                    Swarthmore College Libraries
                  </Link>
                </p>
                <p>
                  <Link to={globalVariables.tricLib} className="g-link ">
                    Tri-College Library
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Contact &amp; Address
                </h6>
                <p className="contactInfo">
                  <span>
                    {" "}
                    {`${contacts.swat.address}   ( `}
                    <a className="g-link" href={globalVariables.swatAddressMap}>
                      map
                    </a>
                    {` )`}
                  </span>
                </p>
                <p className="contactInfo">
                  <span>Swarthmore:</span>
                  <br />
                  <span className="phone">Phone: {contacts.swat.phone}</span>
                  <br />
                  <span className="email">Email: {contacts.swat.email}</span>
                </p>
                <p className="contactInfo">
                  <span>McCabe Library:</span>
                  <br />
                  <span className="phone">Phone: {contacts.library.phone}</span>
                  <br />
                  <span className="email">Email: {contacts.library.email}</span>
                </p>
                <p className="contactInfo">
                  <span>FHL:</span>
                  <br />
                  <span className="phone">Phone: {contacts.fhl.phone}</span>
                  <br />
                  <span className="email">Email: {contacts.fhl.email}</span>
                </p>
              </div>
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
            Digital Scholarship Library
          </a>
        </div>
      </footer>
    </Row>
  );
};

export default Footer;
