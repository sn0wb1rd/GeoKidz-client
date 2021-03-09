import React,  {setState, useState, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import Control from 'react-leaflet-control';
import { Link } from 'react-router-dom';
import pinguin from "../images/pinguin-face.png";
import fox from "../images/fox-right.png";
import unicorn from "../images/unicorn-34.png";
import LayerControl from "./LayerControl"
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PopupTreasure from "./PopupTreasure"


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
    "https://www.flaticon.com/svg/vstatic/svg/1040/1040230.svg?token=exp=1615285860~hmac=1afb27476fb01ae98494c634dac63d48",
  iconSize: [30, 40],
});

const Profile = (props) => {
  const { user } = props;
  let [userposition, setUserPosition] = useState([52.324231, 4.837905])


  
  
  if (user) {
    return (
    
      <div>
        <h1>Profile of {user.username}</h1>
        <div>Your superpower is: {user.superpower}!</div>
        <img src={getGuideImg(user.guide)} alt="guide" className="avatar-talk"/>Hey {user.username} !
        <div>Here are the treasures you've collected: </div>
        {/* Check if there are findings. */}

        {
          user.findings.length !== 0 ? (
            <div>
                <MapContainer
                  style={{ width: "800px", height: "500px" }}
                  center= {userposition}
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
                <LayerControl></LayerControl>
                
                {/* <Control position="topleft" >
                    <button 
                      onClick={ () => setUserPosition({bounds: [51.3, 0.7]}) }
                    >
                      Reset View
                  </button>
              </Control> */}


                <Marker
                    icon={findingPosition}
                    position={[user.findings[0].lat, user.findings[0].long]}
                  >
                  <Popup className="pop-up">Founded!</Popup>
                </Marker>

                {
                  user.findings.map((findings, id) => {
                    return (
                      <Marker
                        key={id}
                        icon={findingPosition}
                        position={[findings.lat,findings.long]}
                      >
                        <PopupTreasure treasure={findings}></PopupTreasure>
                      </Marker>
                    )
                  })
                }

                </MapContainer>       
            </div>
            ) : (
            <></>
          )
        }



        {          
          user.findings.length !== 0 ? ( 
            user.findings.map((finding) => {
              return  <div key={finding._id}>
                        <div>Itemname: {finding.itemname}</div>
                        <div>Owner: {finding.owner}</div>
                        <div>Location: {finding.lat}, {finding.long}</div>
                      </div> })
          ) : (
            <div>aaah you don't have any treasures found yet!</div>
          )
        }        

      </div>
    );
  }

  return (
    <div className="spinner">
      <Spinner animation="border" variant="light" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )
};

export default Profile;
