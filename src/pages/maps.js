import React from "react";
import { useEffect, useState } from "react";
import { Link } from "gatsby"

import { Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import Layout from "../components/Layout";
import Map from "../components/Map"

import { nj1 } from "/content/geodata/northern-journey-1.js"
import { nj2 } from "/content/geodata/northern-journey-2.js"
import { sj1 } from "/content/geodata/southern-journey-1.js"
import { sj2 } from "/content/geodata/southern-journey-2.js"
import { redman } from "/content/geodata/Redman.js"


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
        <h1>Maps of Travels in the Ministry</h1>
        <p>
        It has long been the custom of Friends for spiritually weighty members 
        to undertake a journey to visit other congregations, a practice known 
        as “traveling in the ministry.” These journeys could last anywhere 
        from several weeks to several years, during which the traveling 
        minister would attend various meetings, often including the sessions of 
        one or more yearly meetings. Families who were members of a local 
        congregation might also meet with the traveling minister individually, 
        and sometimes additional sessions of a meeting were called or “appointed” 
        for the occasion of the visit. These visits were a key way of keeping 
        far-flung Friends connected to a wider Quaker community that spanned the 
        Atlantic World, as the travelers often brought news of friends and family 
        from distant meetings. In a religious society without a single central 
        authority, the interchange of ministers also helped keep Friends in step 
        on doctrine. These journeys thus served as important threads tying the whole 
        Friendly network of transatlantic Quakers together. 
        </p>
        <p>
        Many of the ministers featured in <i>Friendly Networks</i> traveled in the 
        ministry, and a number kept journals recording their journeys. Five of these 
        trips are highlighted on this page: Joshua Evans’s four journeys in the 1790s, 
        and Mercy Redman’s journey in 1760. To visualize these journeys, <Link to="/credits">
        FHL staff and students</Link> tracked
        down, to the best of their ability, the locations mentioned in 
        each journal. This was made easier in Evans’s case by the fact that he kept lists 
        of the locations he visited and the distances between them, which in many cases 
        helped narrow down ambiguous geographic terms. 
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
            minZoom={5}
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
