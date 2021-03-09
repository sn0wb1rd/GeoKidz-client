import React from "react";
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import config from "../config";
import { Spinner } from "react-bootstrap";

const MyDetails = (props) => {
    // ## DELETE (added error and onDelte:
  const {user, onDelete, error} = props
  const history = useHistory();
  //## changes error to errormp
  const [errormp, setError]  = useState(null)
  const [mapdetail, setMapdetails] = useState([])


  // check if the user is loggedin for showing the page
  // if (!user) {return <Redirect to={'/'} /> }

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/mapitems/${props.match.params.mapitemId}`)
      .then((response) => {
        setMapdetails(response.data)
        console.log('check: 1', response)
      })
      .catch((err) => {
        console.log('burned tosti', err)
        setError(err.response)
      })

    }, [])


 


 // ## NOT NECESSARY, OTHERWISE data gets loaded without clicking on the page 
//   useEffect(() => {
//     getMapdetails()
//     // console.log('check 2', mapdetail)
//   },[])
  

if (mapdetail && user) {  

    return (

      <div>
          <button onClick={() => (history.push("/map"))}>Bring me back to the map!</button>
          <h5>Treasure: {mapdetail.itemname}</h5>
          <div>Location hint: {mapdetail.locdesc}</div>
          <div>Owner: {mapdetail.owner.username}</div>
          <div>Superpower owner: {mapdetail.owner.superpower}</div>
          <div><img src={mapdetail.image} alt="round-map" className="round-map"></img></div>
  

          {/* ## Display delete button when user is loggedin */}
          {
            user.username === mapdetail.owner.username 
            ? 
            ( <button onClick={() => { onDelete(mapdetail._id) } } >Delete</button> ) 
            : 
            ( <div> you are not the owner</div> )              
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

export default MyDetails;