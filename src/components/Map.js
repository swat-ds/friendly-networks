import React from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const position = [39.856677,-74.90081]

const Map = ({center, maxZoom, minZoom, startZoom, json}) => {

  // Create function for onEachFeature
  // (this extracts the name from a feature to display in a pop-up)
  const addPopup = (feature, layer) => {
    console.log("In addMarker");
    if (feature.properties && feature.properties.name) {
      console.log(feature.properties.name);
      layer.bindPopup(`<p>${feature.properties.name}</p>`);
    }
  }
  return (
    <MapContainer center={center} zoom={startZoom} scrollWheelZoom={true} style={{ height: "600px" }}>
      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Source: Esri'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}.png"
        maxZoom={maxZoom}
        minZoom={minZoom}
      />
      <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
        maxZoom={maxZoom}
        minZoom={minZoom}
      />
      <GeoJSON data={json} onEachFeature={addPopup}/>
      <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map
