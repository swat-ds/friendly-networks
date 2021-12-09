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
      <br />
      <p className="general-text">
        The essence of the Quakers Quakers believe that there is something of
        God in everybody and that each human being is of unique worth. This is
        why Quakers value all people equally, and oppose anything that may harm
        or threaten them. Quakers seek religious truth in inner experience, and
        place great reliance on conscience as the basis of morality. They
        emphasise direct experience of God rather than ritual and ceremony. They
        believe that priests and rituals are an unnecessary obstruction between
        the believer and God. Quakers integrate religion and everyday life. They
        believe God can be found in the middle of everyday life and human
        relationships, as much as during a meeting for worship. What Quakers
        believe Among key Quaker beliefs are: God is love the light of God is in
        every single person a person who lets their life be guided by that light
        will achieve a full relationship with God everyone can have a direct,
        personal relationship with God without involving a priest or minister
        redemption and the Kingdom of Heaven are to be experienced now, in this
        world Quakers want to make this a better world
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
          <StaticImage src="../../content/assets/images/" alt="A kitten" />
        </div>
      </div>
    </Layout>
  );
};

export default home;
