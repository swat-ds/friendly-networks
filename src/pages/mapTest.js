import React from "react";
import { Row, Col } from "react-bootstrap";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Map from "../components/Map"
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'


const jsonData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type":"Feature",
      "geometry": {
        "type":"Point",
        "coordinates": [-75.0376700, 39.8915000]
      },
      "properties": {
        "name": "Haddonfield",
        "administrationCode": "NJ",
        "countryCode": "US"
      }
    },
    {
      "type":"Feature",
      "geometry": {
        "type":"Point",
        "coordinates": [-86.2502700, 35.7503500]
      },
      "properties": {
        "name": "Tennessee",
        "administrationCode": "TN",
        "countryCode": "US"
      }
    },
    {
      "type":"Feature",
      "geometry": {
        "type":"Point",
        "coordinates": [-74.6682000, 39.8776900]
      },
      "properties": {
        "administrationCode": "NJ",
        "countryCode": "US"
      }
    }
  ]
}

const MapPage = ({ data }) => {
  return (
    <Layout>
      <Row>
        <Col/>
        <Col>
          <Map
            center={[39.856677,-74.90081]}
            maxZoom={11}
            minZoom={5}
            startZoom={7}
            json={jsonData}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default MapPage;
