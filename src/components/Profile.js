import React, { setState, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import Control from 'react-leaflet-control';
import { Link, Redirect } from "react-router-dom";
import pinguin from "../images/pinguin-face.png";
import thunder from "../images/thunder.png";
import fox from "../images/fox-face.png";
import unicorn from "../images/unicorn-34.png";
import LayerControl from "./LayerControl";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PopupTreasure from "./PopupTreasure";

let getGuideImg = (guide) => {
  switch (guide) {
    case "fox":
      return fox;
    case "unicorn":
      return unicorn;
    case "pinguin":
      return pinguin;
  }
};

const findingPosition = new L.Icon({
  iconUrl:
    "https://res.cloudinary.com/alexandra-wtp/image/upload/v1615367916/t1n7axjjzll1rf7e7pjk.svg",
  iconSize: [30, 40],
});

const Profile = (props) => {
  const { user } = props;
  //TODO: set bounding box from all items
  //Amsterdam forest [52.324231, 4.837905]
  let [userposition, setUserPosition] = useState([52.324231, 4.837905]);

  if (user) {
    return (
      <div className="profileContent">
        <h2>{user.username}</h2>
        <div>
          Superpower <img className="thunder" src={thunder} alt="thunder" />{" "}
          <img src={thunder} alt="thunder" className="thunder" />{" "}
          <img src={thunder} alt="thunder" className="thunder" />:{" "}
          {user.superpower}
        </div>
        <img
          src={getGuideImg(user.guide)}
          alt="guide"
          className="avatar-talk"
        />
        <h2>Treasures</h2>
        {/* Check if there are findings. */}
        {user.findings.length !== 0 ? (
          <div>
            <MapContainer
              style={{ width: "800px", height: "500px" }}
              center={userposition}
              zoom={15}
              scrollWheelZoom={false}
              id="map"
            >
             <TileLayer
                attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}"
                subdomains={'abcd'}
                minZoom= {1}
                maxZoom= {16}
                ext= {'jpg'}
                />
              <Marker
                icon={findingPosition}
                position={[user.findings[0].lat, user.findings[0].long]}
              >
                <Popup className="pop-up">Founded!</Popup>
              </Marker>
              {user.findings.map((findings, id) => {
                return (
                  <Marker
                    key={id}
                    icon={findingPosition}
                    position={[findings.lat, findings.long]}
                  >
                    <PopupTreasure treasure={findings}></PopupTreasure>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        ) : (
          <></>
        )}
        {user.findings.length !== 0 ? (
          user.findings.map((finding) => {
            return (
              <div key={finding._id}>
                <div>Itemname: {finding.itemname}</div>
                <div>Owner: {finding.owner}</div>
                <div>
                  Location: {finding.lat}, {finding.long}
                </div>
              </div>
            );
          })
        ) : (
          <div>
          <div className="on-top">Oww you haven't any treasures yet! </div>
          <Link className="transparent-btn no-style-link" to="/map">Find one</Link>
          </div>
        )}
      </div>
    );
  }

  // return (
  //   <Redirect to={'/signin'} />
  // );
};

export default Profile;
