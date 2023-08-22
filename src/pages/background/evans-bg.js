import React from "react";
import Layout from "../../components/Layout";
import { SEO } from "../../components/SEO";
import { Row } from "react-bootstrap";
import "../../styles/pageStyles.scss";
import backgrooundCards from "../../components/BackgroundCards"

// Image imports
import two from "../../../content/markdown/images/image2.jpg";

const author_bg = () => {
    const pageCardData = [
        {
            text: "Joshua Evans: An Overview",
            link: "/background/joshua-evans/evans-biography",
            imageSrc: two,
            alt: "thumbnail",
            id: ""
        },
        {
            text: "Evans's Journal",
            link: "/background/joshua-evans/evans-journal",
            imageSrc: two,
            alt: "thumbnail",
            id: ""
        }
    ]

    return (
        <Layout>
            <Row id="main-row" className="background-jh background-row" >
                <h1>Background: Joshua Evans</h1>
                {backgrooundCards(pageCardData)}
            </Row>
        </Layout>
    );
};

// Enrich <head> tag
export const Head = () => (
  <SEO title="Joshua Evans - Friendly Networks"/>
)

export default author_bg;