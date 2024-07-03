import React from "react";
import { Row, Col } from "react-bootstrap";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Map from "../components/Map"
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { nj1 } from "/content/geodata/northern-journey-1.js"

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
        <Col>
          <Map
            center={[41.97141704129031, -71.89499962774197]}
            maxZoom={11}
            minZoom={3}
            startZoom={7}
            json={nj1}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default MapPage;
