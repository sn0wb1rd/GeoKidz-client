import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import config from "../config";
import { Spinner } from "react-bootstrap";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const MyDetails = (props) => {
  const { user, onDelete, error } = props;
  const history = useHistory();
  //## changes error to errormp
  const [errormp, setError] = useState(null);
  const [mapdetail, setMapdetails] = useState([]);

  // check if the user is loggedin for showing the page
  // if (!user) {return <Redirect to={'/'} /> }

  useEffect(() => {
    console.log("in useEffect");
    axios
      .get(`${config.API_URL}/api/mapitems/${props.match.params.mapitemId}`)
      .then((response) => {
        setMapdetails(response.data);
      })
      .catch((err) => {
        setError(err.response);
      });
  }, []);

  // both user and mapdetail has to be loaded with values
  if (user && mapdetail.owner) {
    return (
      <div>
        <div className="profileContent">
        <NotificationContainer/>
          <div>
            <img
              src={mapdetail.image}
              alt="round-map"
              className="about-treasure"
            ></img>
          </div>
          <h3>{mapdetail.itemname}</h3>
          <div>Owner: {mapdetail.owner.username}</div>
          <div>Hint: {mapdetail.locdesc}</div>
          {/* ## Display delete button when user is owner */}
          {user.username === mapdetail.owner.username ? (
            <button
              onClick={() => {
                onDelete(mapdetail._id);
              }}
              className="transparent-btn centered-btn"
            >
              Delete
            </button>
          ) : (
            <></>
          )}
          <h5>Previous finders and locations</h5>
          {mapdetail.objhistory.map((singleObj) => {
            return (
              <div key={singleObj._id}>
                <div>
                  {singleObj.finder}, {mapdetail.locdesc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="spinner">
      <Spinner animation="border" variant="light" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default MyDetails;
