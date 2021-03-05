import React from "react";

import { Redirect } from 'react-router-dom';
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import config from "../config";

const MyDetails = (props) => {
  const {user} = props
  const [error, setError]  = useState(null)
  const [mapdetail, setMapdetails] = useState([])

  // check if the user is loggedin for showing the page
  // if (!user) {return <Redirect to={'/'} /> }



  const getMapdetails = () => {
    let mapitemId = props.match.params.mapitemId
    // console.log('in Mydetails - getMapDetails ', mapitemId)
    
    axios
      .get(`${config.API_URL}/api/mapitems/${mapitemId}`)
      .then((response) => {
        console.log('in response data: ', response)
        setMapdetails(response.data)
        console.log('check: 1', mapdetail.itemname)
      })
      .catch((err) => {
        console.log('burned tosti', err)
        setError(err.response.data)
      })
  }

  useEffect(() => {
    setMapdetails(getMapdetails)
    console.log('check 2', mapdetail)
  },[])
  



  return (

    <div>

       this is the page: mapdetails
       <button onClick={() => getMapdetails()  } >Klik to get data</button>
       {
         mapdetail && 
         <div>
          <div>{mapdetail.image}</div>
          <div>{mapdetail.itemname}</div>
          <div>{mapdetail.locdesc}</div>
          {/* <div>{mapdetail.owner}</div> */}
        </div>
       }
     </div>
  );
};

export default MyDetails;