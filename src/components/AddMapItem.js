import React from "react";
import axios from "axios";
import config from "../config";
import { useHistory } from "react-router-dom";

const getPositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function AddMapItem(props) {
  const { user } = props;
  const history = useHistory();

  const addTreasure = (event, pos) => {
    let newObjhistory = {
      finder: user.username,
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    };

    let mapitem = {
      itemname: event.target.itemname.value,
      image: event.target.image.value,
      owner: user._id,
      locdesc: event.target.locdesc.value,
      objhistory: newObjhistory,
    };
    console.log("in Appjs in handleSubmit -mapitem-- ", mapitem);

    axios
      .post(`${config.API_URL}/api/create`, mapitem, { withCredentials: true })
      .then((response) => {
        console.log("in Appjs handleSubmit res data: ", response.data);
        history.push("/map");
      })
      .catch((err) => {
        // setError(err.response.data);
        console.log("burned tosti in post create item:", err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        addTreasure(event, pos);
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
      getPositionOptions
    );
    console.log("here in the handleSubmit!");
    // when new mapitem is created, the first founder is same as owner
  };

  // // check if the user is loggedin for showing the page
  // if (!user) {return <Redirect to={'/'} /> }

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="form"
      >
        <h3>Add a new treasure</h3>
        <div className="form-group">
          <input
            name="image"
            type="text"
            className="register-input"
            id="Inputimage"
            placeholder="image url"
          />
        </div>
        <div className="form-group">
          <input
            name="itemname"
            type="text"
            className="register-input"
            id="ItemName"
            placeholder="Give your new treasure a name!"
          />
        </div>
        <div className="form-group">
          {/* schould only be a non-editble field with only placeholder with the loggedin user */}
          <input
            name="owner"
            type="text"
            className="register-input"
            id="Owner"
            placeholder="Owner"
          />
        </div>
        <div className="form-group">
          <input
            name="locdesc"
            type="text"
            className="register-input"
            id="LocationDescription"
            placeholder="Tell something about the location. Don't make it too easy for the finder!"
          />
        </div>
        {/* here comes the lat and long. stm like value={lat}
            Hidden, but can be passed in the onSubmit of the form */}
        <input name="lat" type="hidden"></input>
        <input name="long" type="hidden"></input>
        <button type="submit" className="form-btn centered-btn">
          Add Treasure!
        </button>
      </form>
    </div>
  );
}

export default AddMapItem;
