import React from "react";
import {useState, useEffect } from "react";
import { Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import Layout from "../components/Layout";
import Map from "../components/Map"
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'

import { nj1 } from "/content/geodata/northern-journey-1.js"
import { nj2 } from "/content/geodata/northern-journey-2.js"
import { sj1 } from "/content/geodata/southern-journey-1.js"
import { sj2 } from "/content/geodata/southern-journey-2.js"
import { redman } from "/content/geodata/redman.js"


const MapPage = ({ data }) => {
  const maps = [
    {name: "Evans's 1st journey North", data: nj1},
    {name: "Evans's 2nd journey North", data: nj2},
    {name: "Evans's 1st journey South", data: sj1},
    {name: "Evans's 2nd journey South", data: sj2},
    {name: "Redman's journey North", data: redman},
  ]
  
  const [currentMap, setMap] = useState(0)

  // Handle display of filter buttons: 
  const minWidth = 530;
  const [filterVertical, setFilterVertical] = useState(false)
  useEffect(() => { // Check size of window on component load
    if (window && window.innerWidth < minWidth) {
      setFilterVertical(true)
    }
    else if (window && window.innerWidth >= minWidth) {
      setFilterVertical(false)
    }
  }, [])
  useEffect(() => {   // Keep track of window resize
    const handleResize = () => {
      if (window && window.innerWidth < minWidth) {
        setFilterVertical(true)
      }
      else if (window && window.innerWidth >= minWidth) {
        setFilterVertical(false)
      }
    };
    if (window) {
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      };
    }
  }, [])

  return (
    <Layout>
      <Row id="main-row">
        <h1>Map</h1>
        <p>
          The journals of Joshua Evans and Mercy Redmond record their travels
          in the ministry, 
        </p>
        <ToggleButtonGroup 
            name="collection" 
            type="radio"
            defaultValue={currentMap}
            id="map-choice"
            vertical={filterVertical}
          >
          {maps.map((map, idx) => (
            <ToggleButton
              className="map-toggle-btn"
              key={idx}
              id={`map-butn-${idx}`}
              type="radio"
              variant="primary"
              name="map"
              value={idx}
              checked={currentMap === idx}
              onChange={(e) => setMap(e.currentTarget.value)}
            >
              {map.name}
            </ToggleButton>
          ))}
          </ToggleButtonGroup>
        <Col id="map-col">
          <Map
            maxZoom={11}
            minZoom={3}
            startZoom={7}
            json={maps[currentMap].data}
            key={currentMap}
            path={true}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default MapPage;
