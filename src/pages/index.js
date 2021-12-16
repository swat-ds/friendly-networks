import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { scroller } from "react-scroll";
import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";
import "../styles/styles.scss";

const home = ({location}) => {
  return (
    <Layout>
      <Row>
        <h1 className="general-text">Our Beloved Friend: The Journals of John Hunt</h1>
        <p className="general-text">
        Since its origins in the 1650s, the Quaker community has encompassed a densely interconnected transatlantic network. Friendly Networks explores ways to describe Quaker identities, outline Quaker social networks, and connect them to archival sources, with a focus on the journals of New Jersey minister John Hunt (1740-1824). These journals, kept from 1770 to 1824, document not only Hunt’s daily activities and religious life but also his advocacy for non-violence, the end of slavery, and the fair treatment of Native Americans and African Americans.
        </p>
      </Row>
    </Layout>
  );
};

export default home;
