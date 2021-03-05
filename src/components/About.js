import React from "react";
import { Link } from 'react-router-dom';

const About = (props) => {
  console.log('in About | props: ', props)

  return (
    <div>

      this is the page: About

      {
        props.user ? (
          <button onClick={props.onlogout} >Logout</button>
        ) : (
          <div>            
            <Link to="/signin">Already an user? Sing in here! </Link>
            <Link to="/">New here? Click here to choose an guide and sign in!</Link>
            
          </div>
        )
      } 
        <Link to="/mapdetails">go to mapdetails </Link>
        <Link to="/map">go to the map </Link>
     </div>
  );
};

export default About;