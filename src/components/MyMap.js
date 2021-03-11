import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import config from "../config.js";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LayerControl from "./LayerControl"
import {NotificationContainer, NotificationManager} from 'react-notifications';



const getPositionOptions = {
  enableHighAccuracy: true,
  timeout: 500,
  maximumAge: 0,
};

const kidPosition = new L.Icon({
  iconUrl:
    "https://res.cloudinary.com/alexandra-wtp/image/upload/v1615369978/bear_kfqmdf.png",
  iconSize: [40, 40],
});

const stonePosition = new L.Icon({
  iconUrl:
    "https://res.cloudinary.com/alexandra-wtp/image/upload/v1615367916/t1n7axjjzll1rf7e7pjk.svg",
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
  let leaveItBtn;
  const { user, onConfirm, error } = props;
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

  const editTreasure = (e, pos, treasureId, locDesc, leaveItBtn) => {
    let locationDescription = "";
    if (leaveItBtn) {
      locationDescription = locDesc;
      NotificationManager.info('Well done, you earned 10 points!', 'Saved as founded treasure');
    } else {
      locationDescription = e.target.locdesc.value;
      NotificationManager.info('Well done, you earned 20 points!', 'Treasure is found, new location is saved!');

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

  const handleSubmit = (e, treasureId, locDesc, leaveItBtn) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        editTreasure(e, pos, treasureId, locDesc, leaveItBtn);
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
        <div className="top-map">
          <Link to="/map/create" className="transparent-btn no-style-link">
            New treasure
          </Link>
          <NotificationContainer/>
          <div className="names">Points: 50 </div>
        </div>
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          id="map"
        >
       <LayerControl></LayerControl>
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
                  {/* <Link to={`/mapdetails/${treasure._id}`}>
                    See more details
                  </Link> */}
                  <div style={description}>Hint: {treasure.locdesc}</div>
                  <p>
                    Founded? Well done! <br></br>Now choose what to do : <strong>leave it here</strong>,
                    or <strong>find another place to hide</strong>. Once you've find the new hide, click
                    on the corresponding button to store the new position.
                  </p>
                  <button
                    onClick={(e) => {onConfirm('newLocation'),
                      handleSubmit(
                        e,
                        treasure._id,
                        treasure.locdesc,
                        (leaveItBtn = true)
                      );
                    }}
                    type="submit"
                    className="form-btn centered-btn other-color"
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
                          (leaveItBtn = false)
                        );
                      }}
                    >
                      <button
                        type="submit"
                        className="form-btn centered-btn"
                        id="LocationDescriptionLeave"                        
                      >
                        Store a new location
                      </button>
                      <input
                        name="locdesc"
                        type="text"
                        placeholder="New hint"
                        id="LocationDescription"
                        className="register-input hint-input"
                      />
                      {                
                        error && <p>{error.errorMessage}</p>        
                      }
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