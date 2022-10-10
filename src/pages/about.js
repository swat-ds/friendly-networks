import React from "react";
import Layout from "../components/Layout";
import { SEO } from "../components/SEO";
import { Link } from "gatsby";
import "../styles/pageStyles.scss";
import { globalVariables } from "../globalVariables";

import { Row, Col, Button } from "react-bootstrap";
const about = () => {
  return (
    <Layout>
      <Row id="main-row">
        <Col>
          <h3>An Ambitious project for our Our Beloved Friend John Hunt</h3>
          <br />
          <section>
            <ul>
              <li>
                <p>
                  This project is dedicated to John Hunt, specifically digitally
                  archiving journals he wrote throughout his life. John Hunt was
                  an active member of the Society of Friends (colloquially known
                  as the Quakers). John Hunt was born in 1740, the son of Robert
                  and Abigail (Wood) Hunt of New Jersey. His father was a first
                  cousin to the John Woolman (1720-1772). In 1763, John Hunt
                  married Esther Warrington in the Chester meeting house, under
                  the supervision of Evesham Monthly Meeting. He was a Quaker
                  minister for more than 50 years and died in 1824. His
                  memorial, published in 1841, highlighted his public testimony
                  concerning pride and superfluity, and stated that he was
                  particularly concerned with temperance.
                </p>
              </li>
              <li>
                <p>
                  Besides his active presence as a Quaker, John Hunt was a
                  farmer and carpenter in New Jersey.
                </p>
              </li>
              <li>
                <p>
                  Following William Penn's advice, John Hunt kept a journal for
                  over half a century, beginning in 1770 and ending shortly
                  before his death in 1824. This original work, penned in his
                  own hand, is in the collections of Friends Historical Library.
                </p>
              </li>
              <li>
                <p>
                  The Friends Historical Library of Swarthmore College initiated
                  an ambitious project to digitally archive these momentous
                  journals, in the context of Quakerism, in SNAC Cooperative and
                  as well as in another digital assets management sector called
                  Islandora. Going beyond archiving, the project is
                  accomplishing in building a user-friendly website where these
                  journals can be displayed interactively.
                </p>
              </li>
              <li>
                <p>
                  The main aim of pulling out these journals and displaying it
                  on a nice website is so that researchers and historians can
                  extract meaning insights and interpretation from the
                  information contained within the journals. The site has
                  implemented many interactive features, in addition to
                  displaying the journals, so that information and understanding
                  of the journals can be harnessed very easily, conveniently,
                  and informatively.
                </p>
              </li>
            </ul>

            <br/>
            <h2>Acknowledgments</h2>
            <p>
                This project would not have been possible without the love and support from John Hunt's family.
                The stage at which this project currently is also made possible by tremendous contributions
                from the following people:
                Nabil Kayshap, Celia Caust-Ellenbogen, James Truitt, Ayodeji George, Anna Chaewon Jeong, Zaki Hossain.
            </p>
          </section>
          <br />
          <h4>
            For a detail detailed documentation about this website, click below
          </h4>
          <Link style={{textDecoration: "none"}} to={globalVariables.doc}>
              <Button variant="outline-success">
                  Documentation
              </Button>
          </Link>
        </Col>
      </Row>
    </Layout>
  );
};

// Enrich <head> tag
export const Head = () => (
  <SEO title="About - Friendly Networks"/>
)
export default about;
