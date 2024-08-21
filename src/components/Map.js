import React from "react";
import { Link } from "gatsby";
import { Button } from "react-bootstrap";
import L from "leaflet";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Popup, Marker, useMap } from 'react-leaflet'
import TextPath from 'react-leaflet-textpath' 

import "../styles/map.scss";

const Map = (props) => {

  // Unpack props
  const {center, maxZoom, minZoom, startZoom, json, path} = props;
  
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
      link = <strong><Link to={feature.properties.link}>Journal Entry</Link></strong>
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



const MapNavButton = ({index, direction}) => {
  const map = useMap()

  // Calculate target index
  const target = direction === "Next" ? index-1 : index+1;

  // Look for relevant layer
  const layers = Object.values(map._layers).filter( 
    el => el?.options?.id === target
  )
  
  // Exit if no relevant marker exists (e.g., first/last in sequence)
  if (layers.length === 0) {return null}

  const layer = layers[0]

  return (
  <Button 
    variant="secondary" 
    onClick={() => {
      map.flyTo(
        layer._latlng, maxZoom, {duration: 0.5, animate: true}
      )
      layer.openPopup()
    }}
    >
      {direction}
    </Button>)
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
        <TileLayer
         attribution='GOOGLE'
         url='http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
         maxZoom={maxZoom}
         minZoom={minZoom}
         subdomains={['mt0','mt1','mt2','mt3']}
       />
        {json.features.reverse().map((feature, index) => {
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
                <Marker id={index} position={[
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
