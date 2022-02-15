import React from "react";
import Layout from "../../components/Layout";
import { Row } from "react-bootstrap";
import "../../styles/pageStyles.scss";
import homepageCards from "../../components/HomepageCards"

// Image imports
import one from "../../../content/markdown/images/image1.jpg";
import two from "../../../content/markdown/images/image2.jpg";
import four from "../../../content/markdown/images/image4.jpg";
import six from "../../../content/markdown/images/image6.jpg";
import nine from "../../../content/markdown/images/image9.jpg";
import ten from "../../../content/markdown/images/image10.jpg";
import shelf from "/content/assets/images/bookshelf.jpg";
import fhlEntrance from "/content/assets/images/fhl-entrance.jpg";
import cover from "/content/assets/images/HuntVol1Cover.jpg";
import ledger from "/content/assets/images/ledger.jpg";

const author_bg = () => {
    const pageCardData = [
        {
            text: "Introducing John Hunt",
            link: "/background/john-hunt/1-introducing-john-hunt",
            imageSrc: six,
            alt: "thumbnail",
            id: ""
        },
        {
            text: "The Form of the Journal",
            link: "/background/quaker-bg/0-Form_of_the_Journal",
            imageSrc: four,
            alt: "thumbnail",
            id: ""
        },
        {
            text: "“Advantages”: Why Keep a Journal?",
            link: "/background/john-hunt/2-why-keep-a-journal",
            imageSrc: cover,
            alt: "thumbnail",
            id: ""
        },
        {
            text: "“About Home:” The Hunt Family",
            link: "/background/john-hunt/3-family",
            imageSrc: ten,
            alt: "thumbnail",
            id: ""
        },
        {
            text: "The Quaker World of John Hunt",
            link: "/background/john-hunt/4-quaker-world",
            imageSrc: one,
            alt: "thumbnail",
            id: ""
        },
        {
            text: "“Dear Friends:” Mentors and Role Models",
            link: "/background/john-hunt/5-mentors-role-models",
            imageSrc: two,
            alt: "thumbnail",
            id: ""
        },
        {
            text: "“Everything that is Required of Us:” Hunt & Quaker Testimonies",
            link: "/background/john-hunt/6-quaker-testimonies",
            imageSrc: nine,
            alt: "thumbnail",
            id: ""
        },
        {
            text: "Hunt’s Bookshelf",
            link: "/background/john-hunt/7-bookshelf",
            imageSrc: shelf,
            alt: "thumbnail",
            id: ""
        },
        {
          text: "John Hunt material at Friends Historical Library",
          link: "/background/john-hunt/8-Hunt-bibliography",
          imageSrc: fhlEntrance,
          alt: "thumbnail",
          id: ""
        },
        {
            text: "Chronology of Hunt's Life",
            link: "/background/timeline",
            imageSrc: ledger,
            alt: "thumbnail",
            id: ""
        },
    ]

    return (
        <Layout>
            <Row id="main-row" className="background-jh" >
                <h1>Background: John Hunt</h1>
                {homepageCards(pageCardData)}
            </Row>
        </Layout>
    );
};

export default author_bg;
