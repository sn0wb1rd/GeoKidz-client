import React from "react";
import { Link } from "react-router-dom";
import roundMap from "./public/images/rounded-map.jpg"

const Home = () => {
  return (
    <div>
      <h1>Create treasures and find other ones.</h1>
      <img src="round-map.png" alt="round-map" class="round-map"></img>
      <Link to="/signin"><button class="btn">Play now</button></Link>
    </div>
  );
};

export default Home;
