import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import { SEO } from "../components/SEO";
import HomepageCards from "../components/HomepageCards"
import { Row, Col } from "react-bootstrap";
import "../styles/styles.scss";

// Import images
import journalPage from "../../content/assets/images/A0011519_p1.png";
import rJordan from "../../content/assets/images/richardJordan.png";
import map from "../../content/assets/images/A00179843_map.png"
import stairs from "../../content/assets/images/A00179825_meetinghouse.png"
import mtgHouse from "/content/markdown/images/image2.jpg";
import huntCover from "/content/assets/images/HuntVol1Cover.jpg";
import evansCover from "/content/assets/images/EvansMsACover.jpg";


const homepageCardDataMain = [
  {
    imageSrc: journalPage,
    alt: "",
    text:(<><strong>Explore</strong> the writings</>),
    link:"/writings",
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
    imageSrc: huntCover,
    alt: "",
    text: "Read Hunt's writings",
    link: "/writings",
    id: "hunt-journal-card"
  },
  {
    imageSrc: stairs,
    alt: "",
    text: "Learn about Hunt's life",
    link:"/background/hunt-bg",
    id:"hunt-bg-card"
  },
];

const homepageCardDataEvans = [
  {
    imageSrc: evansCover,
    alt: "",
    text: "Read Evans's writings",
    link: "/writings",
    id: "evans-journal-card"
  },
  {
    imageSrc: mtgHouse,
    alt: "",
    text: "Learn about Evans's life",
    link:"/background/evans-bg",
    id:"evans-bg-card"
  },
];


const home = ({location}) => {

  return (
    <Layout>
      <Row className="general-text" id="homepage-text"><Col>
        <h1>Friendly Networks</h1>
        <p><cite>Friendly Networks</cite> explores ways to describe Quaker identities, outline Quaker social networks, and connect them to archival sources. Since its origins in the 1650s, the Quaker community has encompassed a densely interconnected transatlantic network. Quakers excelled in creating and maintaining connections with scattered Friends, and the resulting relationships allow us to trace the movement of ideas throughout the Quaker world.</p>
        <p>The project focuses on John Hunt and Joshua Evans, two Quaker ministers and diarists from Burlington County, New Jersey. Their writings offer a window onto a complex social network while also documenting their daily activities, their spiritual lives, and their advocacy for non-violence, the end of slavery, and the fair treatment of Native Americans.</p>
        <p>This website and the research behind it are made possible with support from the H. David and Joyce E. Hunt Family Foundation Special Projects Fund.</p>
      </Col></Row>
      <Row className="homepage-card-row">
        <HomepageCards cardArray={homepageCardDataMain} sm={6} md={4}/>
      </Row>
      <Row id="subcollections">
        <Col id="homepage-Hunt-col" md={6}>
          <div>
          <h2>
            Our Beloved Friend<br/>
            <span className="subtitle">The Journals of John Hunt</span>
          </h2>
          <p>The first stage of <cite>Friendly Networks</cite> focuses on the journal of minister John Hunt (1740-1824). Hunt's voluminous journal, kept from 1770 to 1824, documents his daily life in Burlington County. </p>
          </div>
        </Col>
        <Col id="homepage-Evans-col" md={6}>
          <div>
          <h2>
            As Bread Cast on the Waters<br/>
            <span className="subtitle">The Journals of Joshua Evans</span>
          </h2>
          <p>The second stage of <cite>Friendly Networks</cite> focuses on the journal of minister Joshua Evans (1731-1798). Evans's journal includes an autobiography and a detailed account of his travels up and down the eastern seaboard from 1794 to 1798.</p>
          </div>
        </Col>
        <HomepageCards cardArray={homepageCardDataHunt} sm={6} md={6}/>
        <HomepageCards cardArray={homepageCardDataEvans} sm={6} md={6} />
      </Row>
    </Layout>
  );
};

export default home

// Enrich <head> tag
export const Head = () => (
  <SEO />
)
