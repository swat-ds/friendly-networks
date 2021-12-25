import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import HomepageCards from "../components/HomepageCards"
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
    alt: "Manuscript journal page from 1776-12-24",
    text:(<><strong>Explore</strong> John Hunt’s journals</>),
    link:"/journals",
    id:"explore-card"
  },
  {
    imageSrc: rJordan,
    alt: "Woodcut of Richard Jordan standing in the yard of his South Jersey farm",
    text:(<><strong>Discover</strong> Hunt’s friends &amp; family</>),
    link:"/people",
    id:"discover-card"
  },
  {
    imageSrc: map,
    alt: "Network itinerary map of southeastern Pennsylvania",
    text:(<><strong>Traverse</strong> Hunt’s social network</>),
    link:"/network",
    id:"traverse-card"
  },
  {
    imageSrc: stairs,
    alt: "Interior photograph of the Evesham meeting house",
    text:(<><strong>Learn</strong> about John Hunt's life &amp; times</>),
    link:"/background/author-bg",
    id:"learn-card"
  },
];


const home = ({location}) => {

  return (
    <Layout>
      <Row className="general-text" id="homepage-text">
        <h1>Our Beloved Friend: The Journals of John Hunt</h1>
        <p>
        Since its origins in the 1650s, the Quaker community has encompassed a densely interconnected transatlantic network. Friendly Networks explores ways to describe Quaker identities, outline Quaker social networks, and connect them to archival sources, with a focus on the journals of New Jersey minister John Hunt (1740-1824). These journals, kept from 1770 to 1824, document not only Hunt’s daily activities and religious life but also his advocacy for non-violence, the end of slavery, and the fair treatment of Native Americans and African Americans.
        </p>
        <p>
        This website and the research behind it are made possible with support from the H. David and Joyce E. Hunt Family Foundation Special Projects Fund.
        </p>
        <HomepageCards cardArray={homepageCardData}/>
      </Row>
    </Layout>
  );
};

export default home;
