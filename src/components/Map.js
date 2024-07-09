import React from "react";
import L from "leaflet";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup, GeoJSON, useMap, FeatureGroup } from 'react-leaflet'

import "../styles/map.scss";

const Map = (props) => {

  // Unpack props
  const {center, maxZoom, minZoom, startZoom, json, path} = props;

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

  const styleFunction = feature => {
  //   // Get index of feature in array of features
  //   const index = json.features.findIndex(x => x === feature)
  //   // Adjust for fact that first half features is points, not lines
  //   const percentage = (2*index/json.features.length - 1)
  //   // Convert to hex percentage
  //   const hexPercentage = Math.floor(256*percentage).toString(16).padStart(2, '0')
  //   const negaHexPerc = Math.floor(256-256*percentage).toString(16).padStart(2, '0')
  //   // Convert to RGB string
  //   const rgbString = `#${negaHexPerc}${negaHexPerc}${hexPercentage}`
  //   console.log(rgbString) 
  //   return {color: rgbString}
  }

  /////////////////////////////////////////////////////////////////////

  // Try adding some functions to draw arrows on lines
  // (Source: 
  // https://stackoverflow.com/questions/53307322/leaflet-polyline-arrows )
  function getArrows(arrLatlngs, color, arrowCount, mapObj) {
    if (typeof arrLatlngs === undefined || arrLatlngs == null ||    
(!arrLatlngs.length) || arrLatlngs.length < 2)          
    return [];

    if (typeof arrowCount === 'undefined' || arrowCount == null)
        arrowCount = 1;

    if (typeof color === 'undefined' || color == null)
        color = '';
    else
        color = 'color:' + color;

    var result = [];
    for (var i = 1; i < arrLatlngs.length; i++) {
        var icon = L.divIcon({ 
          className: 'arrow-icon', 
          bgPos: [5, 5], 
          html: '<div style="' 
          + color 
          + ';transform: rotate(' + getAngle(arrLatlngs[i - 1], arrLatlngs[i], -1).toString() 
          + 'deg)">▶</div>' 
        });
        for (var c = 1; c <= arrowCount; c++) {
            result.push(L.marker(myMidPoint(arrLatlngs[i], arrLatlngs[i - 1], (c / (arrowCount + 1)), mapObj), { icon: icon }));
        }
    }
    return result;
}

function getAngle(latLng1, latlng2, coef) {
    var dy = latlng2[0] - latLng1[0];
    var dx = Math.cos(Math.PI / 180 * latLng1[0]) * (latlng2[1] - latLng1[1]);
    var ang = ((Math.atan2(dy, dx) / Math.PI) * 180 * coef);
    return (ang).toFixed(2);
}

function myMidPoint(latlng1, latlng2, per, mapObj) {
    if (!mapObj)
        throw new Error('map is not defined');

    var halfDist, segDist, dist, p1, p2, ratio,
        points = [];

    p1 = mapObj.project(new L.latLng(latlng1));
    p2 = mapObj.project(new L.latLng(latlng2));

    halfDist = distanceTo(p1, p2) * per;

    if (halfDist === 0)
        return mapObj.unproject(p1);

    dist = distanceTo(p1, p2);

    if (dist > halfDist) {
        ratio = (dist - halfDist) / dist;
        var res = mapObj.unproject(new Point(p2.x - ratio * (p2.x - p1.x), p2.y - ratio * (p2.y - p1.y)));
        return [res.lat, res.lng];
    }

}

function distanceTo(p1, p2) {
    var x = p2.x - p1.x,
        y = p2.y - p1.y;

    return Math.sqrt(x * x + y * y);
}

function toPoint(x, y, round) {
    if (x instanceof Point) {
        return x;
    }
    if (Array.isArray(x)) {
        return new Point(x[0], x[1]);
    }
    if (x === undefined || x === null) {
        return x;
    }
    if (typeof x === 'object' && 'x' in x && 'y' in x) {
        return new Point(x.x, x.y);
    }
    return new Point(x, y, round);
}

function Point(x, y, round) {
    this.x = (round ? Math.round(x) : x);
    this.y = (round ? Math.round(y) : y);
}

const Arrows = (path) => {
  const map = useMap()
  if (path) {
    const latLngs = json.features[json.features.length-1].geometry.coordinates
    const added = L.featureGroup(getArrows(latLngs, 'red', 1, map)).addTo(map)
    console.log(added);
  }
  return null
}
/////////////////////////////////////////////////////////

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
          onEachFeature={addPopup} 
          style={path ? styleFunction : null}
        />
        <Arrows path={path}/>
        <MapZoomer data={json}/>
        {props.children}
      </MapContainer>
    );
  }
  return null;
};

export default Map
