import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const getPositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const kidPosition = new L.Icon({
  iconUrl: 'https://ucff3a825c2cc1051e5d8c5584b8.previews.dropboxusercontent.com/p/thumb/ABH-Hq3AjPOP8hCzfeTpmDrGR4tAmeu7QbgQItaYTWMlQHKyRDnA7IN5ZXeeWxV3v81y3EihW660rvx_613nQF-J7SEjZNTHI9D9hJS2baqWKj_3VLPeclcuecSV4NKeMH3ioCVPfEtr4etwcq-SIR3SlyjkfT5KTKmcWS9ow4dSIr6nYDfpYYy8skFGXBwE0iNCZ6p_gV9mGEYoY_Z7ODP3QX5sOozRBF1ieC9WrQUciKmbw8cEBhAox3ozlHzwA3dShvq8f6zBZrnqo0nBEHgkGxPUDYUhYLk0OuPdlAQ3D2wKk1tkvLZYmhD2BYZWlx90Rst5SxgnRItI8Y2WkR4U5RAER5Yau3bF45RDKkF0WumDy2HUW35BQzrw15K_n_MWwH1KOEKm418-yYUNcpvzXdDUv8x-4Xy3tJOCpkGafw/p.png?fv_content=true&size_mode=5',
  iconSize: [30, 40],
});

const MyMap = () => {
  let [position, setPosition] = useState(null);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
      getPositionOptions
    );
  });
  
  if (position) {
    return (
      <div>
        <MapContainer style={{width: '800px', height: '500px'}}  center={position} zoom={15} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={kidPosition} position={position}>
            <Popup>
              You're here!
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
  }
  return <div>Loading ...</div>
  
}

export default MyMap