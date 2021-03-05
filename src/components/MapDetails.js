import React from "react";

import { Redirect } from 'react-router-dom';
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import config from "../config";

const MyDetails = (props) => {
  const {user} = props
  const [error, setError]  = useState(null)
  const [mapdetail, setMapdetails] = useState([])
  const [mapitemId, setMapitemId] = useState(props.match.params.mapitemId)

  // check if the user is loggedin for showing the page
  // if (!user) {return <Redirect to={'/'} /> }



  const getMapdetails = () => {  
    // console.log('in Mydetails - getMapDetails ', mapitemId)    
    axios
      .get(`${config.API_URL}/api/mapitems/${mapitemId}`)
      .then((response) => {
        setMapdetails(response.data)
      })
      .catch((err) => {
        console.log('burned tosti', err)
        setError(err)
      })
  }

  return (

    <div>

       this is the page: mapdetails
       <button onClick={() => getMapdetails()  } >Klik to get the mapdetails </button>
       {
         // the 'owner' object takes longer to load, therefore
         // wait untill the owner is also has data
         mapdetail.owner && 
         <div>
          <div>{mapdetail.image}</div>
          <div>{mapdetail.itemname}</div>
          <div>{mapdetail.locdesc}</div>
          <div>{mapdetail.owner.username}</div>
          <div>{mapdetail.owner.superpower}</div>          
        </div>
       }
     </div>
  );
};

export default MyDetails;