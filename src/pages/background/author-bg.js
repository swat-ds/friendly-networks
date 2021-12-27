import React from "react";
import { Link } from "gatsby";
import Layout from "../../components/Layout";
import { globalVariables } from "../../globalVariables";
import { Row, Col, Card } from "react-bootstrap";
import "../../styles/pageStyles.scss";
import homepageCards from "../../components/HomepageCards"

// Image imports
import one from "../../../content/markdown/images/image1.jpg";
import two from "../../../content/markdown/images/image2.jpg";
import three from "../../../content/markdown/images/image3.jpg";
import four from "../../../content/markdown/images/image4.jpg";
import five from "../../../content/markdown/images/image5.jpg";
import six from "../../../content/markdown/images/image6.jpg";
import nine from "../../../content/markdown/images/image9.jpg";
import ten from "../../../content/markdown/images/image10.jpg";

  //  timeline: "/background/author-background/timeline",
  //  bookshelf: "/background/john-hunt/7-bookshelf",
  //  form_of_the_journal: "/background/quaker-bg/0-Form_of_the_Journal",
  //  introduction: "/background/john-hunt/1-introducing-john-hunt",
  //  family: "/background/john-hunt/3-family",
  //  mentors_role_models: "/background/john-hunt/5-mentors-role-models",
  //  bibliography: "/background/author-background/bibliography",

const author_bg = () => {
    const pageCardData = [
        {
            text: "Introducing John Hunt",
            link: "/background/john-hunt/1-introducing-john-hunt",
            imageSrc: four,
            alt: "",
            id: ""
        },
        {
            text: "The Form of the Journal",
            link: "/background/quaker-bg/0-Form_of_the_Journal",
            imageSrc: six,
            alt: "",
            id: ""
        },
        {
            text: "“Advantages”: Why Keep a Journal?",
            link: "/background/john-hunt/2-why-keep-a-journal",
            imageSrc: "",
            alt: "",
            id: ""
        },
        {
            text: "“About Home:” The Hunt Family",
            link: "/background/john-hunt/3-family",
            imageSrc: ten,
            alt: "",
            id: ""
        },
        {
            text: "The Quaker World of John Hunt",
            link: "/background/john-hunt/4-quaker-world",
            imageSrc: one,
            alt: "",
            id: ""
        },
        {
            text: "“Dear Friends:” Mentors and Role Models",
            link: "/background/john-hunt/5-mentors-role-models",
            imageSrc: two,
            alt: "",
            id: ""
        },
        {
            text: "“Everything that is Required of Us:” Hunt & Quaker Testimonies",
            link: "/background/john-hunt/6-quaker-testimonies",
            imageSrc: nine,
            alt: "",
            id: ""
        },
        {
            text: "Hunt’s Bookshelf",
            link: "/background/john-hunt/7-bookshelf",
            imageSrc: "",
            alt: "",
            id: ""
        },
        {
            text: "Chronology of Hunt's Life",
            link: "/background/timeline",
            imageSrc: "",
            alt: "",
            id: ""
        },
        {
            text: "John Hunt material at Friends Historical Library",
            link: "/background/john-hunt/8-Hunt-bibliography",
            imageSrc: "",
            alt: "",
            id: ""
        }
    ]

    return (
        <Layout>
            <Row>
                <h1>Background: John Hunt</h1>
                {homepageCards(pageCardData)}
            </Row>
        </Layout>
    );
};

export default author_bg;
