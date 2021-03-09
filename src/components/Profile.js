import React,  {useState, useEffect} from "react";
import pinguin from "../images/pinguin-face.png";
import fox from "../images/fox-right.png";
import unicorn from "../images/unicorn-34.png";
import axios from "axios";
import config from "../config.js";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

const Profile = (props) => {
  const { user } = props;
 


  
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
            user.findings.map((finding) => {
              return  <div key={finding._id}>
                        <div>Itemname: {finding.itemname}</div>
                        <div>Owner: {finding.itemname}</div>
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
