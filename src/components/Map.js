import React from "react";
import { useRef} from "react"
import { Link } from "gatsby";

import L from "leaflet";
import { Button } from "react-bootstrap";
import { Popup, Marker, MapContainer, TileLayer, useMap } from 'react-leaflet'
import TextPath from 'react-leaflet-textpath' 

import "../styles/map.scss";

const Map = (props) => {

  // Unpack props
  const {center, maxZoom, minZoom, startZoom, json, path} = props;
  
  // Make a list of useRefs to hold all the geoJSON markers in order
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const refs = json.features.filter(x => x.geometry.type === "Point").map(x => useRef(null))

  const PopupContent = ({feature}) => {    
    
    // Name and State
    var state;
    if (feature.properties && feature.properties.name) {
      state = feature.properties?.countryCode === "US"
        ? ", " + feature.properties.adminCode
        : "";
    }
    // Date of arrival
    var arrived;
    if (feature.properties.dateOfArrival) {
      arrived = <><strong>Arrived: </strong> 
        {feature.properties.dateOfArrival}<br/></>
    }
    // Distance
    var distance;
    if (feature.properties.distance) {
      distance = <>
        <strong>Distance: </strong> 
        {Number.parseFloat(feature.properties.distance).toFixed(0)} miles<br/>
      </>
    }
    //Notes
    var notes;
    if (feature.properties.description) {
      notes = <><strong>Note: </strong><br/> 
        {feature.properties.description}<br/></>
    }
    var link;
    if (feature.properties.link) {
      link = <strong><Link to={feature.properties.link } target="_blank">Journal Entry</Link></strong>
    }
    return (
      <div>
        <h3>{feature.properties.name + state}</h3>
        <p>
          {arrived}
          {distance}
          {notes}
          {link}
        </p>
      </div>
    )
  }

function toMarker(index, refs, map) {
  console.log(`In toMarker(${index})`);

  // Get & dereference the useRef for the relevant marker
  const marker = refs[index].current
  if (! marker) {
    console.log("babye");
    return null
  };
  console.log("index", index);
  console.log("ref", refs[index])
  console.log("marker", marker);
  console.log("coords", marker.getLatLng());
  
  // Set fly speed based on proximity
  const speed = map.getBounds().contains(marker.getLatLng()) ? 0.5 : 1

  // Execute fly maneuver
  map.flyTo(
    marker.getLatLng(), maxZoom, {duration: speed, animate: true}
  )

  // Open marker's popup (only after zoom finishes, to prevent vector layer lag)
  map.once('zoomend', () => {
    setTimeout(() => {
      marker.openPopup()
    })
  })
}

const MapNavButton = ({index, direction}) => {
  const map = useMap()

  // Calculate target index
  const target = direction === "Next" ? index+1 : index-1;
  
  // Exit if trying to go out of list bounds
  if (target < 0 || target >= refs.length) {return null}

  return (
    <Button 
      variant="secondary" 
      onClick={() => toMarker(target, refs, map)}
      >
        {direction}
      </Button>)
}

const StartButton = (hasPath) => {
  const map = useMap()

  if (! hasPath) {return}
  return (
    <Button 
      id="to-start" 
      className="leaflet-control leaflet-bar" 
      onClick={ () => toMarker(0, refs, map)}
    >
      Beginning
    </Button>
  )
}

  // Define a small component to call fitBounds
  // (This way all points in geoJson start out visible)
  const MapZoomer = (data) => {
    const map = useMap() // Get reference to the current map
    if (data) {
      const bounds = L.geoJson(json).getBounds(); // Get bounds of geoJson
      map.fitBounds(bounds, {padding: [20, 20]}); // Fit map to those bounds
    }
    return null
  };

  if (typeof window !== 'undefined') {
    return (
      <MapContainer 
        center={center} zoom={startZoom} scrollWheelZoom={true} path={path}
      >
        {/* <TileLayer
        attribution='Tiles &copy; Esri &mdash; Source: Esri'
        url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
        maxZoom={maxZoom}
        minZoom={minZoom}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png'
          subdomains={"abcd"}
          maxZoom={maxZoom}
          minZoom={minZoom}
          /> */}
        <TileLayer
          attribution='Tiles &copy; Google &mdash; Source: Google'
          url='http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
          maxZoom={maxZoom}
          minZoom={minZoom}
          subdomains={['mt0','mt1','mt2','mt3']}
        />
        <StartButton hasPath={path} /> 
        {json.features.map((feature, index) => {
          if (feature.geometry.type === "LineString") {
            // Flip coordinates to lat,lng instead of lng,lat
            const points = feature.geometry.coordinates.map(point => [point[1], [point[0]]])
            return <TextPath 
              positions={points} 
              pathOptions={{color: "#636B42", weight: "6"}}
              text=" ➛ "
              repeat
              offset={4}
              attributes={{fill: '#FAF8D6'}}
            />
          }
          if (feature.geometry.type === "Point") {
            return(
                <Marker ref={refs[index]} position={[
                    feature.geometry.coordinates[1],
                    feature.geometry.coordinates[0]
                  ]}>
                  <Popup>
                    <PopupContent feature={feature}/>
                    {path ? <div className="mapButtons">
                      <MapNavButton index={index} direction="Prev"/>
                      <MapNavButton index={index} direction="Next"/> 
                    </div>
                    : null}
                  </Popup>
                </Marker>
            )
          }
        })}
        <MapZoomer data={json}/>
        {props.children}
      </MapContainer>
    );
  }
  return null;
};

export default Map
