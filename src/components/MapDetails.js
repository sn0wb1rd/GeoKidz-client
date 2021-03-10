import React from "react";
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import config from "../config";
import { Spinner } from "react-bootstrap";

const MyDetails = (props) => {
  const {user, onDelete, error} = props
  const history = useHistory();
  //## changes error to errormp
  const [errormp, setError] = useState(null);
  const [mapdetail, setMapdetails] = useState([]);


  // check if the user is loggedin for showing the page
  // if (!user) {return <Redirect to={'/'} /> }

  useEffect(() => {
    console.log('in useEffect')
    axios
      .get(`${config.API_URL}/api/mapitems/${props.match.params.mapitemId}`)
      .then((response) => {
        setMapdetails(response.data)
      })
      .catch((err) => {
        setError(err.response)
      })
    }, [])

 
// both user and mapdetail has to be loaded with values
if (user && mapdetail.owner) { 

    return (
      <div>
          <button className="form-btn" onClick={() => (history.push("/map"))}>Bring me back to the map!</button>
          {/* ## Display delete button when user is loggedin */}
          {
            user.username === mapdetail.owner.username
            ? 
            ( <button onClick={() => { onDelete(mapdetail._id) } } >Delete</button> ) 
            : 
            ( <></> )              
           }
          
          <h5>Treasure: {mapdetail.itemname}</h5>
          <div>Location hint: {mapdetail.locdesc}</div>
          <div>Owner: {mapdetail.owner.username}</div>
          <div>Superpower owner: {mapdetail.owner.superpower}</div>
          <h6>Location history of treasure</h6>
          <div>Obj history: {mapdetail.objhistory[0].finder}</div>
          <div>Obj history: {mapdetail.objhistory[0].lat}</div>
          {
            mapdetail.objhistory.map((singleObj) => {
              return (
              <div key={singleObj._id}>
                <div>-- Finder: {singleObj.finder} --</div>
                <div>Superpower: {singleObj.Superpower}</div>
              </div>
              )
            })
          }
          <div><img src={mapdetail.image} alt="round-map" className="round-map"></img></div>
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