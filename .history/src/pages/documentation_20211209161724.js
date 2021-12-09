import React from "react";
import Layout from "../../components/Layout";
import { Link } from "gatsby";
import { globalVariables } from "../globalVariables";

import { Row, Col, Button } from "react-bootstrap";

const documentation = () => {
  return (
    <Layout>
      <Row>
        <Col>
          <h2>Features of this website</h2>
          <ul>
            <li>
              <h4>Landing page</h4>
              <ul>
                <li>This page contains succinct information about the site</li>
                <li>Our goal of creating the site in few words</li>
                <li>
                  Direct the user to where they can find the most useful
                  information
                </li>
                <li>Still on progress to add more</li>
              </ul>
            </li>
            <li>
              <h4>Journal Page</h4>
              <ul>
                <li>
                  This page shows the journal manuscript and the corresponding
                  transcript
                </li>
                <li>It allows manuscript images to be zoomed on a tile base</li>
                <li>
                  It automatically changes the manuscript image when scrolled to
                  next page with button
                </li>
              </ul>
            </li>
            <li>
              <h4>People page</h4>
              <ul>
                <li>
                  This page shows all the people related to John Hunt, each on a
                  small card with some basic information
                </li>
                <li>
                  The user can click on any part of the card, and it will take
                  them to a page where there are detailed information about the
                  person, including a mini network diagram
                </li>
              </ul>
            </li>
            <li>
              <h4>Network page</h4>
              <ul>
                <li>
                  This page displays a network diagram of every relative or
                  acquaintance of the author
                </li>
                <li>The diagram is a Force Directed Graph created with D3</li>
              </ul>
            </li>
            <li>
              <h4>Timeline page</h4>
              <ul>
                <li>This page contains a timeline of the author</li>
                <li>
                  On the timeline, it lists some of the events happened to John
                  Hunt or is immediate relative and an associated time
                </li>
              </ul>
            </li>
            <li>
              <h4>Additional page page</h4>
              <ul>
                <li>Searching</li>
                <li>Other features maybe appended (tentative)</li>
              </ul>
            </li>
            <li>
              <h4>Major tools used</h4>
              <ul>
                <li>GatsbyJS</li>
                <li>D3</li>
                <li>OpenSeaDragon</li>
                <li>React-bootstrap</li>
                <li>Sass</li>
              </ul>
            </li>
            <li>
              <h4>Reference</h4>
              <ul>
                <li>
                  <a href="/www.gatsbyjs.com">GatsbyJS</a>
                </li>
                <li>
                  <a href="/https://d3js.org/">D3</a>
                </li>
                <li>
                  <a href="/https://openseadragon.github.io/">OpenSeaDragon</a>
                </li>
                <li>
                  <a href="/https://react-bootstrap.github.io/">
                    React-bootstrap
                  </a>
                </li>
                <li>
                  <a href="/https://www.youtube.com/watch?v=y7DxbW9nwmo&t=4998s">
                    Force Directed Graph Tutorial
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <Link style={{ textDecoration: "none" }} to={globalVariables.about}>
            <Button variant="outline-success">Back to About</Button>
          </Link>
        </Col>
      </Row>
    </Layout>
  );
};

export default documentation;
