import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import config from "../config";

const MyDetails = (props) => {
  // ## DELETE (added error and onDelte:
  const { user, onDelete, error } = props;
  //## changes error to errormp
  const [errormp, setError] = useState(null);
  const [mapdetail, setMapdetails] = useState([]);

  // check if the user is loggedin for showing the page
  // if (!user) {return <Redirect to={'/'} /> }

  const getMapdetails = () => {
    let mapitemId = props.match.params.mapitemId;
    // console.log('in Mydetails - getMapDetails ', mapitemId)

    axios
      .get(`${config.API_URL}/api/mapitems/${mapitemId}`)
      .then((response) => {
        console.log("in response data: ", response);
        setMapdetails(response.data);
        console.log("check: 1", mapdetail.itemname);
      })
      .catch((err) => {
        console.log("burned tosti", err);
        setError(err.response.data);
      });
  };

  // ## NOT NECESSARY, OTHERWISE data gets loaded without clicking on the page
  //   useEffect(() => {
  //     getMapdetails()
  //     // console.log('check 2', mapdetail)
  //   },[])

  return (
    <div>
      <button onClick={() => getMapdetails()}>Klik to get data</button>
      {
        // ## add mapdetail.owner  as an extra condition
        // owner should not be empty too
        mapdetail && mapdetail.owner && (
          <div>
            <div>{mapdetail.image}</div>
            <div>{mapdetail.itemname}</div>
            <div>{mapdetail.locdesc}</div>
            <div>{mapdetail.owner.username}</div>
            <div>{mapdetail.owner.superpower}</div>
          </div>
        )
      }

      {/* ## DELETE */}
      <button
        onClick={() => {
          onDelete(mapdetail._id);
        }}
      >
        Delete
      </button>
      {/* <a href="url_to_delete" onclick="return confirm('Are you sure you want to delete this item?');">Delete</a> */}

      {/* EDIT TREASURE */}
      <Link to={`/map/edit/${mapdetail._id}`}>
        <button className="btn">Edit mapitem with a new location!</button>
      </Link>
    </div>
  );
};

export default MyDetails;
