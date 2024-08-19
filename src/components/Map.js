import React, { useState } from "react";
import { renderToString } from 'react-dom/server'
import { Button } from "react-bootstrap";
import L from "leaflet";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { GeoJSON, FeatureGroup, Popup, Marker, useMap } from 'react-leaflet'
import TextPath from 'react-leaflet-textpath' 
// ^ Import necessary for access to setText property

import "../styles/map.scss";

const Map = (props) => {

  // Unpack props
  const {center, maxZoom, minZoom, startZoom, json, path} = props;

  const layers = []

  // Functions for onEachFeature in GeoJSON
  const forFeature = (feature, layer) => {
    if (feature.geometry.type === "Point") {
      addPopup(feature, layer)
    }
    if (path) {
      addTextPath(feature, layer)
    }
  }
  
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
      notes = <><strong>Note: </strong> 
        {feature.properties.description}<br/></>
    }
    return (
      <div>
        <h3>{feature.properties.name + state}</h3>
        {arrived}
        {distance}
        {notes}
      </div>
    )
  }

  // (this extracts the name from a feature to display in a pop-up)
  const addPopup = (feature, layer) => {

    layers.push(layer)
    console.log(layers, layers[0]._leaflet_id);
    layers[0].fire('click')

    const popup = renderToString(
      <Popup feature={feature} />
    )
    layer.bindPopup(popup);
  }

  // Adding text to line paths
  const addTextPath = (feature, layer) => {
    if (feature.geometry.type === "LineString") {
      layer.setText(
        "➛", 
        {
          repeat: true,
          offset: 4,
          attributes: {
            fill: '#FAF8D6'
          }
        }
      )
    }
  }

  const styleFunction = feature => {
    return {color: "#636B42", weight: "6"}
  }


const MapNavButton = ({index, direction}) => {
  const map = useMap()

  // Calculate target index
  const target = direction === "Next" ? index+1 : index-1;
  console.log("target", target);

  // Look for relevant layer
  const layers = Object.values(map._layers).filter( 
    el => el?.options?.id === target
  )
  console.log(Object.values(map._layers).map(el => el));
  
  // Exit if no relevant marker exists (e.g., first/last in sequence)
  if (layers.length === 0) {return null}

  const layer = layers[0]

  return (
  <Button 
    variant="secondary" 
    onClick={() => {
      map.flyTo(
        layer._latlng, maxZoom, {duration: 0.9, noMoveStart: true}
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
        <TileLayer
         attribution='GOOGLE'
         url='http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
         maxZoom={maxZoom}
         minZoom={minZoom}
         subdomains={['mt0','mt1','mt2','mt3']}
       />
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
          if (feature.geometry.type !== "Point") {
            return null
          }
          return(
              <Marker id={index} position={[
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0]
                ]}>
                <Popup>
                  <PopupContent feature={feature}/>
                  {path ? <>
                    <MapNavButton index={index} direction="Prev"/>
                    <MapNavButton index={index} direction="Next"/> 
                  </>
                  : null}
                </Popup>
              </Marker>
          )
        })}
{/* 
        <GeoJSON 
          data={json} 
          onEachFeature={forFeature} 
          style={path ? styleFunction : null}
        /> */}
        <MapZoomer data={json}/>
        {props.children}
      </MapContainer>
    );
  }
  return null;
};

export default Map
