import React from "react";
import { Row, Col } from "react-bootstrap";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Map from "../components/Map"
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'

const MapPage = ({ data }) => {
  return (
    <Layout>
      <Row>
        <Col/>
        <Col>
          <Map position={[39.856677,-74.90081]}/>
        </Col>
      </Row>
    </Layout>
  );
};

export default MapPage;
