import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Redirect } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import stonePin from "../images/stone-pin.png";
import L from "leaflet";

const MyMap = (props) => {
  const {user} = props
  // check if the user is loggedin for showing the page
  if (!user) {return <Redirect to={'/'} /> }

  const position = [51.505, -0.09];
  let myIcon = L.icon({
    iconUrl: stonePin,
    iconSize: [45, 50],
    className: "stone-pin",
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });


  return (
    <div>
      <MapContainer
        id="mapid"
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
          tileSize={512}
          zoomOffset={-1}
        />
        <Marker icon={myIcon} position={position}>
          <Popup>
            Stone <br /> Look around the bench.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MyMap;
