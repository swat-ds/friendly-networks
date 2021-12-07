import React from 'react'
import Layout from '../components/Layout'
import {Row, Col} from 'react-bootstrap'
import "../assets/styles/styles.scss"
import "../assets/styles/background.scss";

const BgComponent = ({pageContext}) => {
    return (
      <Layout>
        <Row>
          <Col className="col">>
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
