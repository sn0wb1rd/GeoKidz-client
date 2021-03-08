import React from "react";
import pinguin from "../images/pinguin-face.png";
import fox from "../images/fox-right.png";
import unicorn from "../images/unicorn-34.png";

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
  console.log(user);
  
  return (
    <div>
      <h1>Profile</h1>
      <img src={getGuideImg(user.guide)} alt="guide" className="avatar-talk"/>Hey {user.username} !
      <div>Here are the treasures you've collected. </div>
    </div>
  );
};

export default Profile;
