import React from "react";
import L from "leaflet";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup, GeoJSON, useMap } from 'react-leaflet'

import "../styles/map.scss";

const Map = (props) => {

  // Unpack props
  const {center, maxZoom, minZoom, startZoom, json} = props;

  // Create function for onEachFeature
  // (this extracts the name from a feature to display in a pop-up)
  const addPopup = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      const state = feature.properties?.countryCode === "US"
        ? ", " + feature.properties.adminCode
        : "";
      layer.bindPopup(`<h3>${feature.properties.name + state}</h3>`);
    }
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
      <MapContainer center={center} zoom={startZoom} scrollWheelZoom={true} style={{ height: "600px" }}>
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}.png"
          maxZoom={maxZoom}
          minZoom={minZoom}
        />
        <TileLayer
          attribution='Label tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
          maxZoom={maxZoom}
          minZoom={minZoom}
        />
        <GeoJSON data={json} onEachFeature={addPopup}/>
        <MapZoomer data={json}/>
        {props.children}
      </MapContainer>
    );
  }
  return null;
};

export default Map
