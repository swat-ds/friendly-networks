import React from "react";
import { Link } from "gatsby";
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
    </Layout>
  );
};

export default home;
