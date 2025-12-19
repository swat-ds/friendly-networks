import React from "react";
import { useEffect, useState } from "react";
import { Link } from "gatsby"

import { Row, Col, Tab, Tabs, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import Layout from "../components/Layout";
import Map from "../components/Map"

import "../styles/pageStyles.scss"

import { nj1 } from "/content/geodata/northern-journey-1.js"
import { nj2 } from "/content/geodata/northern-journey-2.js"
import { sj1 } from "/content/geodata/southern-journey-1.js"
import { sj2 } from "/content/geodata/southern-journey-2.js"
import { redman } from "/content/geodata/Redman.js"


const MapPage = ({ data }) => {
  const maps = [
    {
      name: "Evans's 1794 journey North",
      data: nj1,
      jsx: <>Joshua Evans&rsquo;s travels in New England, 1794 (<Link to="/writings/A0011541#page001">first page</Link>, <Link to="/writings/A0011541#page068"> summary tables</Link>)</>
    },
    {
      name: "Evans's 1795 journey North",
      data: nj2,
      jsx: <>Joshua Evans&rsquo;s travels in New York and Canada, 1795 (<Link to="/writings/A0011541#page039">first page</Link>, <Link to="/writings/A0011541#page072">summary tables</Link>)</>
    },
    {
      name: "Evans's 1796–97 journey South",
      data: sj1,
      jsx: <>Joshua Evans&rsquo;s travels in the US Southeast, 1796&ndash;1797 (<Link to="/writings/A0011543#page001">first page</Link>, <Link to="/writings/A0011543#page065">summary tables</Link>)</>
    },
    {
      name: "Evans's 1798 journey South",
      data: sj2,
      jsx: <>Joshua Evans&rsquo;s travels in Virginia &amp; Pennsylvania, 1798 (<Link to="/writings/A0011543#page073">first page</Link>, <Link to="/writings/A0011543#page075">summary tables</Link>)</>
    },
    {
      name: "Redman's 1760 journey North",
      data: redman,
      jsx: <>Mercy Redman&rsquo;s travels in New England, 1760 (<Link to="/writings/A00187301">first page</Link>)</>
    },
  ]
  console.log(maps[0]);
  
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
        <Tabs defaultActiveKey="Instructions" id="map-text">
          <Tab eventKey="Instructions" title="Instructions">
            <p>
              Use the green buttons below to choose which
              journey you would like to see mapped.
            </p>
            <p>
              On the map, green lines marked with arrows trace the travel route.
              Green markers note stops on the journey.
              Click one to see the name of the place,
              the date the traveler reached it, and more.
            </p>
            <p>
              Follow along with the journey by using the "Next" and "Prev"
              buttons after opening a marker. The "Beginning" button in the top
              right of the map will take you to the first stop.
            </p>
          </Tab>
          <Tab eventKey="About" title="What is this?">
            <p>
              It has long been the custom of Friends for a spiritually weighty member
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
          </Tab>
        </Tabs>

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
              onChange={(e) => {
                setMap(e.currentTarget.value)
              }}
            >
              {map.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <p>{maps[currentMap].jsx}</p>
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
