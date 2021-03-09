import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import config from "../config.js";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
let firstBtn; // initialisation for conditional action when clicking on treasure detail

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
const MyMap = (props) => {
  const { user } = props;
  let [position, setPosition] = useState(null);
  let [treasures, setTreasures] = useState([]);
  let [setErr] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
      getPositionOptions
    );
  });

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/mapitems`)
      .then((response) => {
        setTreasures(response.data);
      })
      .catch((err) => {
        setErr(err);
      });
  }, [setTreasures]);

  const editTreasure = (e, pos, treasureId, locDesc, firstBtn) => {
    console.log("check 1 ", firstBtn);
    let locationDescription = "";
    if (firstBtn) {
      locationDescription = locDesc;
    } else {
      locationDescription = e.target.locdesc.value;
    }

    axios
      .patch(`${config.API_URL}/api/mapitems/${treasureId}`, {
        locdesc: locationDescription,
        finder: user.username,
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      })
      .then((response) => console.log("data inserted", response.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e, treasureId, locDesc, firstBtn) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        editTreasure(e, pos, treasureId, locDesc, firstBtn);
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
      getPositionOptions
    );
  };

  if (position) {
    return (
      <div className="map-page">
        <Link to="/map/create" className="newTreasure-btn">
          New treasure
        </Link>
        <MapContainer
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
          {treasures.map((treasure, index) => (
            <Marker
              key={index}
              icon={stonePosition}
              position={[
                treasure.objhistory[treasure.objhistory.length - 1].lat,
                treasure.objhistory[treasure.objhistory.length - 1].long,
              ]}
            >
              <Popup>
                <div style={popupContent}>
                  {treasure.image ? (
                    <img
                      src={treasure.image}
                      alt={treasure.itemname}
                      width="40px"
                      className="stone-popUp"
                    />
                  ) : null}
                  <h5>{treasure.itemname}</h5>
                  <Link to={`/mapdetails/${treasure._id}`}>
                    See more details
                  </Link>
                  <div style={description}>Hint: {treasure.locdesc}</div>
                  <p>
                    Founded? Well done! Now choose what to do : leave it here,
                    or find another hidde. Once you've find the new hide, click
                    on the corresponding button to store the new position.
                  </p>
                  <button
                    onClick={(e) => {
                      handleSubmit(
                        e,
                        treasure._id,
                        treasure.locdesc,
                        (firstBtn = true)
                      );
                    }}
                    type="submit"
                    className="form-btn centered-btn"
                  >
                    Leave it here
                  </button>
                  <div>
                    <form
                      onSubmit={(e) => {
                        handleSubmit(
                          e,
                          treasure._id,
                          treasure.locdesc,
                          (firstBtn = false)
                        );
                      }}
                    >
                      <button
                        type="submit"
                        className="form-btn centered-btn"
                        id="LocationDescription"
                      >
                        Store a new position
                      </button>
                      <input
                        name="locdesc"
                        type="text"
                        placeholder="New hint"
                        id="LocationDescription"
                        className="register-input"
                      />
                    </form>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }
  return (
    <div>
      <div className="spinner">
        <Spinner animation="border" variant="light" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
      <div className="finding-location">Finding your location...</div>
    </div>
  );
};
export default MyMap;
