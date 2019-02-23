import React from "react";
import { Map, Marker, Popup } from "react-leaflet";
import "./App.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import MapboxLayer from "./MapboxLayer";

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;

const myIcon = L.icon({
  iconUrl: "https://i.ibb.co/PCWb9cs/adventurer.png",
  iconSize: [40, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

const MapView = props => {
  const position = [props.lat, props.lng];
  return (
    <Map
      style={{ height: "800px", marginLeft: "475px" }}
      className="map"
      center={position}
      zoom={props.zoom}
      maxZoom={18}
      minZoom={3}
    >
      <MapboxLayer
        accessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/outdoors-v9"
      />
      {props.trails.map(item => (
        <Marker
          position={[item.latitude, item.longitude]}
          icon={myIcon}
          key={item.id}
        >
          >
          <Popup autoPan={false}>
            <em>{item.name}</em> {item.conditionDetails}
          </Popup>
        </Marker>
      ))}
    </Map>
  );
};

export default MapView;
