import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import { SEO } from "../components/SEO";
import homepageCards from "../components/HomepageCards"
import { Row, Col, Card } from "react-bootstrap";
import "../styles/styles.scss";

// Import images
import journalPage from "../../content/assets/images/A0011519_p1.png";
import rJordan from "../../content/assets/images/richardJordan.png";
import map from "../../content/assets/images/A00179843_map.png"
import stairs from "../../content/assets/images/A00179825_meetinghouse.png"

const homepageCardData = [
  {
    imageSrc: journalPage,
    alt: "",
    text:(<><strong>Explore</strong> John Hunt’s journals</>),
    link:"/journals",
    id:"explore-card"
  },
  {
    imageSrc: rJordan,
    alt: "",
    text:(<><strong>Discover</strong> Hunt’s friends &amp; family</>),
    link:"/people",
    id:"discover-card"
  },
  {
    imageSrc: map,
    alt: "",
    text:(<><strong>Traverse</strong> Hunt’s social network</>),
    link:"/network",
    id:"traverse-card"
  },
  {
    imageSrc: stairs,
    alt: "",
    text:(<><strong>Learn</strong> about John Hunt's life &amp; times</>),
    link:"/background/author-bg",
    id:"learn-card"
  },
];


const home = ({location}) => {

  return (
    <Layout>
      <Row className="general-text" id="homepage-text">
        <h1>Friendly Networks</h1>
        <p><cite>Friendly Networks</cite> explores ways to describe Quaker identities, outline Quaker social networks, and connect them to archival sources. Since its origins in the 1650s, the Quaker community has encompassed a densely interconnected transatlantic network. Quakers excelled in creating and maintaining connections with scattered Friends and the resulting relationships allow us to trace the movement of ideas throughout the Quaker world.</p>
        <p>This website and the research behind it are made possible with support from the H. David and Joyce E. Hunt Family Foundation Special Projects Fund.</p>
        <h2>Our Beloved Friend: The Journals of John Hunt</h2>
        <p>The current stage of <cite>Friendly Networks</cite> focuses on the journals of New Jersey minister John Hunt (1740-1824). These journals, kept from 1770 to 1824, document Hunt’s daily activities, religious life, and advocacy for non-violence, the end of slavery, and the fair treatment of Native Americans.</p>
        {homepageCards(homepageCardData)}
        <h2>
          <br/>
          As Bread Cast on the Waters
        </h2>
        <p>The journals of <Link to="/people/w6c82qz0">Joshua Evans</Link>, coming in 2023</p>
      </Row>
    </Layout>
  );
};

export default home

// Enrich <head> tag
export const Head = () => (
  <SEO />
)
