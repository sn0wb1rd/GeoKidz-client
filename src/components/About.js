import React from "react";
import { Link } from 'react-router-dom';

const About = (props) => {
  console.log('in About | props: ', props)

  return (
    <div>

      <div>this is the page: About</div>


      {
        props.user ? (
          <button onClick={props.onlogout} >Logout</button>
        ) : (
          <div>            
          <div><Link to="/signin">Already an user? Sing in here! </Link></div>
          <div><Link to="/">New here? Click here to choose an guide and sign in!</Link></div>
            
          </div>
        )
      } 
        <div><Link to="/mapdetails">go to mapdetails </Link></div>
        <div><Link to="/map">go to the map </Link></div>
        <div><Link to="/map/create">add a treasure on the map </Link></div>
        <div><Link to="/map/edit">edit a treasure on the map </Link></div>
        <div><img src="https://res.cloudinary.com/snowbird/image/upload/v1615137690/GeoKidz/pebble_8_wpovbn.jpg" alt="round-map" className="round-map"></img></div>
   
     </div>
  );
};

export default About;