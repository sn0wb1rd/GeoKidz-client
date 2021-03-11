import React from "react";
import cindy from "../images/cindy-teeven.png";
import alexandra from "../images/alexandra-westendorp.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="double-pic">
        <img src={cindy} alt="cindy" className="about-photo" />
        <img src={alexandra} alt="alexandra" className="about-photo" />
      </div>
      <p className="on-top paragraph">
        GeoKidz is the last project of our bootcamp at Ironhack. <br/><br/>

        After three months of intense work, we had one week and a half to
        realized a full-stack application, fully responsive, in React. As a
        geodata specialist, Cindy suggested using geolocalisation for our
        project. GeoKidz was born !<br/><br/>

        We created a game for kids that allows us to use several technologies,
        including React, MongoDB, an API with NodeJs, and ExpressJs. With
        GeoKids, the user can visualize the treasures around him, which are
        painted stones, and collect them in order to earn points. He can also
        create his own painted stone, and place it on our map. Developing this
        game and working together has been a great and learningfull experience
        and we hope that you will feel all the pleasure we had working on it !
        <p className="on-top names">Cindy Teeven and Alexandra Westendorp</p>

        Follow these links to find more information about the code of the <a href="https://github.com/sn0wb1rd/GeoKidz-server">server</a> and
         the <a href="https://github.com/sn0wb1rd/GeoKidz-client">client</a> side. 
        <br/>
        Or feel free to visit our LinkedIn page:<br/>
        <a href="https://www.linkedin.com/in/alexandra-westendorp/">Alexandra Westendorp</a><br/>
        <a href="https://www.linkedin.com/in/cindytvn/">Cindy Teeven</a>


      </p>
    </div>
  );
};

export default About;
