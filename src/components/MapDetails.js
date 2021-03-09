import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import config from "../config";
import { Spinner } from "react-bootstrap";

const MyDetails = (props) => {
    // ## DELETE (added error and onDelte:
  const {user, onDelete, error} = props
  //## changes error to errormp
  const [errormp, setError]  = useState(null)
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

 // ## NOT NECESSARY, OTHERWISE data gets loaded without clicking on the page 
//   useEffect(() => {
//     getMapdetails()
//     // console.log('check 2', mapdetail)
//   },[])
  

if (mapdetail) {
  

    return (

      <div>

          this is the page: mapdetails
          <button onClick={() => getMapdetails()  } >Klik to get data</button>
          {
            // ## add mapdetail.owner  as an extra condition
            // owner should not be empty too
            mapdetail && mapdetail.owner &&         
            <div>
              <div>{mapdetail.image}</div>
              <div>{mapdetail.itemname}</div>
              <div>{mapdetail.locdesc}</div>
              <div>{mapdetail.owner.username}</div>
              <div>{mapdetail.owner.superpower}</div>
              
              {/* ## Display delete button when user is loggedin */}
              {
                user.username === mapdetail.owner.username ? (
                  <button onClick={() => { onDelete(mapdetail._id) } } >Delete</button>
                ) 
                : 
                ( <div> you are not the owner</div> )              
              }

            </div>
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