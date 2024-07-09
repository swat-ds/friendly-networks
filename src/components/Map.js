import React from "react";
import L from "leaflet";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup, GeoJSON, useMap, FeatureGroup } from 'react-leaflet'
import TextPath from 'react-leaflet-textpath'

import "../styles/map.scss";

const Map = (props) => {

  // Unpack props
  const {center, maxZoom, minZoom, startZoom, json, path} = props;

  // Functions for onEachFeature in GeoJSON
  const forFeature = (feature, layer) => {
    if (path) {
      addTextPath(feature, layer)
    }
    addPopup(feature, layer)
  }

  // (this extracts the name from a feature to display in a pop-up)
  const addPopup = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      const state = feature.properties?.countryCode === "US"
        ? ", " + feature.properties.adminCode
        : "";
      const popup = `<h3>${feature.properties.name + state}</h3>`
      layer.bindPopup(popup);
    }
  }

  // Adding text to line paths
  const addTextPath = (feature, layer) => {
    if (feature.geometry.type === "LineString") {
      layer.setText(
        " >", 
        {
          repeat: true,
          attributes: {
            fill: '#535B32',
          }
        }
      )
    }
  }

  const styleFunction = feature => {
    return {color: "#636B42", opacity: "60%"}
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
      <MapContainer center={center} zoom={startZoom} scrollWheelZoom={true} path={path}>
        <TileLayer
         attribution='GOOGLE'
         url='http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
         maxZoom={maxZoom}
         minZoom={minZoom}
         subdomains={['mt0','mt1','mt2','mt3']}
       />
        <GeoJSON 
          data={json} 
          onEachFeature={forFeature} 
          style={path ? styleFunction : null}
        />
        <MapZoomer data={json}/>
        {props.children}
      </MapContainer>
    );
  }
  return null;
};

export default Map
