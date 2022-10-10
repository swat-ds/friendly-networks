import React from 'react'
import Layout from '../components/Layout'
import { SEO } from "../components/SEO";
import {Row, Col, Card} from 'react-bootstrap'
import "../styles/styles.scss"
import "../styles/background.scss";

const BgComponent = ({pageContext}) => {
    return (
      <Layout>
        <Row>
          <Col className="background-col">
            <Card bg="primary"
              className="general-text background"
              dangerouslySetInnerHTML={{ __html: pageContext.body }}
            ></Card>
          </Col>
        </Row>
      </Layout>
    );
}


export const Head = ({pageContext}) => (
  <SEO title={pageContext.title + " - Friendly Networks"}/>
)

export default BgComponent
