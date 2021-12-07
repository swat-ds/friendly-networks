import React from 'react'
import Layout from '../components/Layout'
import {Row, Col} from 'react-bootstrap'

const BgComponent = ({pageContext}) => {
    return (
      <Layout>
        <Row>
          <Col>
            <div
              class
              dangerouslySetInnerHTML={{ __html: pageContext.body }}
            ></div>
          </Col>
        </Row>
      </Layout>
    );
}

export default BgComponent
