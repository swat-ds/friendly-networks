import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Layout from '../components/Layout'
import Image from '../components/Image'
import {Row, Col} from "react-bootstrap"
import "../assets/styles/styles.scss"

const home = () => {
  return (
    <Layout>
      <Row>
        <Col>
          <h1>
            Quakers want to make this a better world human rights, based on
            their belief in equality of all human beings. social justice. peace.
            freedom of conscience.
          </h1>
        </Col>
      </Row>
    </Layout>
  );
};


export default home;
