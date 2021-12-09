import React from 'react'
import Layout from '../components/Layout'
import {Row, Col} from 'react-bootstrap'
import "../assets/styles/styles.scss"
import "../assets/styles/styles.scss";

const BgComponent = ({pageContext}) => {
    return (
      <Layout>
        <Row>
          <Col>
            <div
              className="general-text"
              dangerouslySetInnerHTML={{ __html: pageContext.body }}
            ></div>
          </Col>
        </Row>
      </Layout>
    );
}

export default BgComponent
