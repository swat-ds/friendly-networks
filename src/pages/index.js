import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { scroller } from "react-scroll";
import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";
import "../styles/styles.scss";

const home = ({location}) => {
  console.log(location);
  return (
    <Layout>
      <h1 className="general-text">Our Beloved Friend: The Journals of John Hunt</h1>
      <p className="general-text">
      Since its origins in the 1650s, the Quaker community has encompassed a densely interconnected transatlantic network. Friendly Networks explores ways to describe Quaker identities, outline Quaker social networks, and connect them to archival sources, with a focus on the journals of New Jersey minister John Hunt (1740-1824). These journals, kept from 1770 to 1824, document not only Hunt’s daily activities and religious life but also his advocacy for non-violence, the end of slavery, and the fair treatment of Native Americans and African Americans.

      </p>
      <div style={{ display: "grid" }}>
        {/* You can use a GatsbyImage component if the image is dynamic */}
        <StaticImage
          style={{
            gridArea: "1/1",
            // You can set a maximum height for the image, if you wish.
            // maxHeight: 600,
          }}
          layout="fullWidth"
          // You can optionally force an aspect ratio for the generated image
          aspectRatio={3 / 1}
          // This is a presentational image, so the alt should be an empty string
          alt=""
          // Assisi, Perúgia, Itália by Bernardo Ferrari, via Unsplash
          src={
            "https://images.unsplash.com/photo-1604975999044-188783d54fb3?w=2589"
          }
          formats={["auto", "webp", "avif"]}
        />
        <div
          style={{
            // By using the same grid area for both, they are stacked on top of each other
            gridArea: "1/1",
            position: "relative",
            // This centers the other elements inside the hero component
            placeItems: "left",
            display: "grid",
          }}
        >
          {/* Any content here will be centered in the component */}
          <StaticImage src="../../content/assets/images/HuntLogo_withShadow_small.png" alt="A kitten" />
        </div>
      </div>
    </Layout>
  );
};

export default home;
