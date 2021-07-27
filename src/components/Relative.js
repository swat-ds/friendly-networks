//Package imports
import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {Link} from 'gatsby'
//Local imports
import Layout from "./Layout";
import "../assets/styles/styles.scss"
import Fox from "../assets/images/george_fox.jpeg";
const Relative = (props) => {
    const { id, nameEntries, entityType, biogHists } = props.pageContext
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(biogHists[0].text, "text/xml");
    console.log(xmlDoc)
    const paragraphs =  xmlDoc.getElementsByTagName("p")
    const citation = xmlDoc.getElementsByTagName("citation")
    console.log(paragraphs)
    // console.log(nameEntries)
    return (
      <Layout>
        <Row>
          <Col>
            <div>
              <img id="bio-image" src={Fox} alt="" />
            </div>
            <h1>{nameEntries[0].original}</h1>
            <h1>Title</h1>
            <a href={"https://snaccooperative.org/view/" + id}>
              <h3>SNACC</h3>
            </a>
            {/* <h1>{`${props.name}  ${props.period}`}</h1> */}
            {/* <img src={props.image} alt={props.alt} />
                <div>{props.links}</div> */}
          </Col>
          <Col>
            <article id="bio">
              {paragraphs[0].innerHTML}
              <br />
              <br />
              <figcaption>
                <small>
                  {citation[0].innerHTML}
                </small>
              </figcaption>
            </article>
          </Col>
        </Row>
      </Layout>
    );
}

export default Relative
