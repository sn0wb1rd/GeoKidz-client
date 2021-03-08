import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import config from "../config.js";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const getPositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const kidPosition = new L.Icon({
  iconUrl:
    "https://freepikpsd.com/wp-content/uploads/2019/10/animal-face-png-Free-PNG-Images-Transparent.png",
  iconSize: [30, 30],
});

const stonePosition = new L.Icon({
  iconUrl:
    "https://ucff3a825c2cc1051e5d8c5584b8.previews.dropboxusercontent.com/p/thumb/ABH-Hq3AjPOP8hCzfeTpmDrGR4tAmeu7QbgQItaYTWMlQHKyRDnA7IN5ZXeeWxV3v81y3EihW660rvx_613nQF-J7SEjZNTHI9D9hJS2baqWKj_3VLPeclcuecSV4NKeMH3ioCVPfEtr4etwcq-SIR3SlyjkfT5KTKmcWS9ow4dSIr6nYDfpYYy8skFGXBwE0iNCZ6p_gV9mGEYoY_Z7ODP3QX5sOozRBF1ieC9WrQUciKmbw8cEBhAox3ozlHzwA3dShvq8f6zBZrnqo0nBEHgkGxPUDYUhYLk0OuPdlAQ3D2wKk1tkvLZYmhD2BYZWlx90Rst5SxgnRItI8Y2WkR4U5RAER5Yau3bF45RDKkF0WumDy2HUW35BQzrw15K_n_MWwH1KOEKm418-yYUNcpvzXdDUv8x-4Xy3tJOCpkGafw/p.png?fv_content=true&size_mode=5",
  iconSize: [30, 40],
});

const popupContent = {
  textAlign: "center",
  margin: "10px",
  padding: "10px",
};

const description = {
  padding: "20px",
  fontSize: "15px",
};

const MyMap = () => {
  let [position, setPosition] = useState(null);
  let [treasures, setTreasures] = useState([]);
  let [setErr] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
      getPositionOptions
    );
  });

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/mapitems`)
      .then((response) => setTreasures(response.data))
      .catch((err) => setErr(err));
  }, [setTreasures]);

  if (position) {
    return (
      <MapContainer
        style={{ width: "800px", height: "500px" }}
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        id="map"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={kidPosition} position={position}>
          <Popup className="pop-up">You're here!</Popup>
        </Marker>

        {treasures.map((treasure) => (
          <Marker
            icon={stonePosition}
            position={[
              treasure.objhistory[treasure.objhistory.length - 1].lat,
              treasure.objhistory[treasure.objhistory.length - 1].long,
            ]}
          >
            <Popup>
              <div style={popupContent}>
              {ToastBody.image? (
                <img
                  src={treasure.image}
                  alt={treasure.itemname}
                  width="40px"
                  className="stone-popUp"
                />
              ): null}
                <h5>{treasure.itemname}</h5>
                <div style={description}>{treasure.locdesc}</div>
                <button
                  onClick={checkNextStep}
                  type="submit"
                  className="form-btn centered-btn"
                >
                  Founded
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }

  return (
    <div className="spinner">
      <Spinner animation="border" variant="light" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default MyMap;
