import React from "react";

import { Row } from "react-bootstrap";

import Layout from "../../components/Layout";
import backgroundCards from "../../components/BackgroundCards"
import { Seo } from "../../components/SEO";

import "../../styles/pageStyles.scss";

// Image imports
import two from "../../../content/markdown/images/image2.jpg";
import cover from "/content/assets/images/EvansMsACover.jpg";
import map from "/content/assets/images/A00179843_map2.jpg"


const author_bg = () => {
    const pageCardData = [
        {
            text: "Joshua Evans: An Overview",
            link: "/background/joshua-evans/evans-biography",
            imageSrc: map,
            alt: "thumbnail",
            id: ""
        },
        {
            text: "The Form of Evans's Journal",
            link: "/background/joshua-evans/evans-journal",
            imageSrc: cover,
            alt: "thumbnail",
            id: ""
        },
        {
            text: "Evans's Testimonies",
            link: "/background/joshua-evans/evans-testimonies",
            imageSrc: two,
            alt: "thumbnail",
            id: ""
        }
    ]

    return (
        <Layout>
            <Row id="main-row" className="background-jh background-row" >
                <h1>Background: Joshua Evans</h1>
                {backgroundCards(pageCardData)}
            </Row>
        </Layout>
    );
};

// Enrich <head> tag
export const Head = () => (
  <Seo title="Joshua Evans - Friendly Networks"/>
)

export default author_bg;
