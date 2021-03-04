import React from "react";
import { Link } from "react-router-dom";
import roundMap from "../images/round-map.png";
import pinguin from "../images/pinguin-face.png";
import fox from "../images/fox-face.png";
import unicorn from "../images/unicorn-34.png";

const Home = () => {
  return (
    <div>
      <div className="horizontally-align">
      <div className="vertically-align">
        <h1>Create treasures and find other ones.</h1>
        <Link to="/signin">
          <button className="btn">Play</button>
        </Link>
        </div>
        <img src={roundMap} alt="round-map" className="round-map"></img>
      </div>
      <div className="horizontally-align">
        <div className="vertically-align">
          <h3>New here ? Choose a guide :</h3>
          <div className="avatars">
            <div className="avatar-card">
              <Link to="/signup/unicorn">
                <img src={unicorn} alt="unicorn" className="avatar"></img>
              </Link>
            </div>
            <div className="avatar-card">
              <Link to="/signup/pinguin">
                <img src={pinguin} alt="pinguin" className="avatar"></img>
              </Link>
            </div>
            <div className="avatar-card">
              <Link to="/signup/fox">
                <img src={fox} alt="fox" className="avatar"></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
