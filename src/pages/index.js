import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import { SEO } from "../components/SEO";
import homepageCards from "../components/HomepageCards"
import { Row, Col } from "react-bootstrap";
import "../styles/styles.scss";

// Import images
import journalPage from "../../content/assets/images/A0011519_p1.png";
import rJordan from "../../content/assets/images/richardJordan.png";
import map from "../../content/assets/images/A00179843_map.png"
import stairs from "../../content/assets/images/A00179825_meetinghouse.png"

const homepageCardDataMain = [
  {
    imageSrc: journalPage,
    alt: "",
    text:(<><strong>Explore</strong> the journals</>),
    link:"/journals",
    id:"explore-card"
  },
  {
    imageSrc: rJordan,
    alt: "",
    text:(<><strong>Discover</strong> friends &amp; family</>),
    link:"/people",
    id:"discover-card"
  },
  {
    imageSrc: map,
    alt: "",
    text:(<><strong>Traverse</strong> the social network</>),
    link:"/network",
    id:"traverse-card"
  },
];

const homepageCardDataHunt = [
  {
    imageSrc: stairs,
    alt: "",
    text:(<><strong>Learn</strong> about John Hunt's life &amp; times</>),
    link:"/background/hunt-bg",
    id:"learn-card"
  },
];


const home = ({location}) => {

  return (
    <Layout>
      <Row className="general-text" id="homepage-text"><Col>
        <h1>Friendly Networks</h1>
        <p><cite>Friendly Networks</cite> explores ways to describe Quaker identities, outline Quaker social networks, and connect them to archival sources. Since its origins in the 1650s, the Quaker community has encompassed a densely interconnected transatlantic network. Quakers excelled in creating and maintaining connections with scattered Friends, and the resulting relationships allow us to trace the movement of ideas throughout the Quaker world.</p>
        <p>The project focuses on John Hunt and Joshua Evans, two Quaker ministers and diarists from Burlington County, New Jersey. Their journals offer a window onto a complex social network while also documenting their daily activities, their spiritual lives, and their advocacy for non-violence, the end of slavery, and the fair treatment of Native Americans.</p>
        <p>This website and the research behind it are made possible with support from the H. David and Joyce E. Hunt Family Foundation Special Projects Fund.</p>
      </Col></Row>
      {homepageCards(homepageCardDataMain)}
      <Row>
        <Col md={6}>
          <h2>
            Our Beloved Friend<br/>
            <span className="subtitle">The Journals of John Hunt</span>
          </h2>
          <p>The current stage of <cite>Friendly Networks</cite> focuses on the journals of New Jersey minister John Hunt (1740-1824). These journals, kept from 1770 to 1824, XXXXXXXXXXXX </p>
        </Col>
        <Col md={6}>
        <h2>
          As Bread Cast on the Waters<br/>
          <span className="subtitle">The Journals of Joshua Evans</span>
        </h2>
        <p>The journals of <Link to="/people/w6c82qz0">Joshua Evans</Link>, coming in 2023</p>
      </Col>
    </Row>
    </Layout>
  );
};

export default home

// Enrich <head> tag
export const Head = () => (
  <SEO />
)
