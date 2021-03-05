import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

const getPositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const MyMap = () => {
  const [position, setPosition] = useState(null)
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {setPosition([pos.coords.latitude, pos.coords.longitude])},
      (err) => {console.warn(`ERROR(${err.code}): ${err.message}`)},
      getPositionOptions
    );
  });
  
  if (position) {
    return (
      <div>
      {/* <button onClick={getLocation()}>Try It</button> {latlong} */}
        <MapContainer style={{width: '800px', height: '500px'}}  center={position} zoom={15} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
  }
  return <div>Loading ...</div>
  
}

export default MyMap