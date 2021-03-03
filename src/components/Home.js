import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
// import roundMap from "./public/images/rounded-map.jpg"
=======
import roundMap from "../images/round-map.png";
import pinguin from "../images/pinguin-face.png";
import fox from "../images/fox-face.png";
import unicorn from "../images/unicorn-34.png";
>>>>>>> origin/alexandra

const Home = () => {
  return (
    <div>
      <div className="horizontally-align">
        <h1>Create treasures and find other ones.</h1>
        <img src={roundMap} alt="round-map" className="round-map"></img>
      </div>
      <div className="horizontally-align">
        <div className="vertically-align">
          <h3>Choose a guide :</h3>
          <div className="avatars">
            <div className="avatar-card">
              <img src={unicorn} alt="unicorn" className="avatar"></img>
            </div>
            <div className="avatar-card">
              <img src={pinguin} alt="pinguin" className="avatar"></img>
            </div>
            <div className="avatar-card">
              <img src={fox} alt="fox" className="avatar"></img>
            </div>
          </div>
        </div>
        <Link to="/signin">
          <button class="btn">Play now</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
