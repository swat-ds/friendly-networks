import React from 'react'
import Layout from '../components/Layout'
import {Row, Col} from 'react-bootstrap'
import "../styles/styles.scss"
import "../styles/background.scss";

const BgComponent = ({pageContext}) => {
    return (
      <Layout>
        <Row>
          <Col className="background-col">
            <div
              className="general-text background"
              dangerouslySetInnerHTML={{ __html: pageContext.body }}
            ></div>
          </Col>
        </Row>
      </Layout>
    );
}

export default BgComponent
