import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Redirect, Link } from 'react-router-dom';
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

  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    let crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);

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

      <Link to="/map/create">add a new treasure on the map! </Link>
    </div>
  );
};

export default MyMap;
