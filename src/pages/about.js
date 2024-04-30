import React from "react";
import Layout from "../components/Layout";
import { SEO } from "../components/SEO";
import { Link } from "gatsby";
import "../styles/pageStyles.scss";
import { globalVariables } from "../globalVariables";

import { Row, Col, Card } from "react-bootstrap";
const about = () => {
  return (
    <Layout>
      <Row id="main-row">
      <Col className="background-col">
        <Card bg="primary" className="general-text background">
          <Card.Body>
          <h1>About <i>Friendly Networks</i></h1>
          <p>Since its origins in the 1650s, the Quaker community has encompassed a densely interconnected transatlantic network. <i>Friendly Networks</i> explores the use of open, interoperable standards to describe Quaker identities, outline Friends&rsquo; social networks, and connect them to archival sources. </p>
          <h2>History of the Project</h2>
          <p><i>Friendly Networks</i> grew out of <i>Our Beloved Friend</i>, a project to publish a print edition of the journals of Quaker minister John Hunt. This effort was led by longtime Friends Historical Library staff Chris Densmore and Pat O&rsquo;Donnell. <i>Friendly Networks</i> builds on Chris and Pat&rsquo;s work by profiling the individuals discussed in Hunt&rsquo;s journals, mapping the social networks that connect them, and using this information to provide rich context for a new online edition of the text.</p>
          <h2>Overview</h2>
          <p><i>Friendly Networks</i> uses the <a href="https://eac.staatsbibliothek-berlin.de/" target="_blank">EAC-CPF</a> standard to create and interlink archival authority records for members of an 18th- and 19th-century Quaker social network centered on Burlington County, New Jersey. These records provide biographical and historical background on an entity, document its place in a social network via links to other records, and point researchers towards archival collections containing relevant material. The roughly 200 <Link to="/people">EAC-CPF records</Link> generated for the project are hosted and mediated by the <a href="https://OpenSeadragoncooperative.org" target="_blank">Social Networks and Archival Context platform</a> (SNAC), which makes them available for use by archivists and researchers worldwide. </p>
          <p>The records also enrich <Link to="/journals">digital editions</Link> of the writings of Quaker ministers from Burlington County. The journals of John Hunt (1740-1824) are currently available. These diaries, kept from 1770 to 1824, document not only Hunt&rsquo;s daily activities and religious life but also his advocacy for non-violence, the end of slavery, and the fair treatment of Native Americans and African Americans. The journals of Joshua Evans (1731-1798) will be available later in 2023. </p>
          <p>Finally, the interlinked records allow us to reconstruct and visualize the <Link to="/network">social networks</Link> of these New Jersey Quakers. These connections offer insight into the spread of ideas like antislavery through the Society of Friends at the end of the 18th century, as well as the configuration of Quaker social networks in the lead-up to the Hicksite Schism of 1827.</p>
          <h2>Technical Infrastructure</h2>
          <p>On the technical front, <i>Friendly Networks</i> is particularly interested in exploring how a digital project’s data and impact can outlast the useful life of its custom-coded site. This focus on sustainability led us away from storing all outputs on the project website, which will need ongoing maintenance to remain accessible as technology changes around it. </p>
          <p>Instead, the project site primarily draws on data stored in robust institutional platforms. All EAC-CPF records for the project are hosted on <a href="https://snaccooperative.org" target="_blank">SNAC</a>, where they are broadly discoverable by researchers and available for reuse by other archivists. The data is pulled into the project site through the SNAC API. Similarly, images of Hunt and Evans&rsquo;s journals are hosted on Swarthmore College&rsquo;s <a target="_blank" href="https://digitalcollections.tricolib.brynmawr.edu">Digital Collections platform</a> and displayed on the <i>Friendly Networks</i> site via IIIF. The only data unique to the site is the text of the digital editions, which is encoded using the <a href="https://tei-c.org/" target="_blank">TEI standard</a>. Even this may eventually be moved to the Digital Collections platform.</p>
          <p>The project site itself is built in GatsbyJS and was architected by digital scholarship librarian Nabil Kashyap and student developer Zakir Hossain &lsquo;24, with significant further work by project lead James Truitt. The <Link to="/network">network visualization</Link> is built using <a href="https://d3js.org/" target="_blank">d3.js</a>. The digital editions are rendered via <a href="https://openseadragon.github.io/" target="_blank">OpenSeadragon</a> for the page images and <a href="https://teic.github.io/CETEIcean/" target="_blank">CETEIcean</a> for the text.</p>
          </Card.Body>
        </Card>
      </Col>
      </Row>
    </Layout>
  );
};

// Enrich <head> tag
export const Head = () => (
  <SEO title="About - Friendly Networks"/>
)
export default about;
