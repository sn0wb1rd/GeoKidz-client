import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";
import config from "./config";
import Home from "./components/Home";
import SignIn from "./components/SingIn";
import SignUp from "./components/SignUp";
import MyNav from "./components/MyNav";
import MyMap from "./components/MyMap";
import MapDetails from "./components/MapDetails";
import AddMapItem from "./components/AddMapItem";
import EditMapItem from "./components/EditMapItem"
import About from "./components/About";
import Profile from "./components/Profile";

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [mapitems, updateMapitems] = useState([]);
  const [messageDel, setMessageDel] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  // TODO: add to (almost) all request { withCredentials: true }

  // This will run just once after the first render and never again (with [] as 2nd useEffect parameter)
  // Like componentDidMount
  // storing data loggedin user so no new login is necessary
  useEffect(() => {
    if (loggedInUser === null) {
      axios
        .get(`${config.API_URL}/api/user`, { withCredentials: true })
        .then((response) => {
          setLoggedInUser(response.data);
          console.log("inAppjs in useEffect loggedinuser ");
        })
        .catch((err) => {
          console.log(
            "In Appjs, useEffect error with useeffect since loggeninuser is null"
          );
          setError(err.response);
        });
    }
  }, []);

  // retrieving all mapitems
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/mapitems`)
      .then((response) => {
        updateMapitems(response.data);
      })
      .catch((err) => {
        console.log(
          "In Appjs, useEffect error with useeffect since loggeninuser is null"
        );
        setError(err.response.data);
      });
  }, []);

  const handleSignUp = (event) => {
    event.preventDefault();
    let user = {
      username: event.target.username.value,
      password: event.target.password.value,
      guide: event.target.guide.value,
      superpower: event.target.superpower.value,
    };
    console.log("user sigup: ---- ", user);

    axios
      .post(`${config.API_URL}/api/signup`, user, { withCredentials: true })
      .then((response) => {
        setLoggedInUser(response.data);
        history.push("/map");
      })
      .catch((err) => {
        console.log("burned tosti", err);
        setError(err.response.data);
      });
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    let user = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    axios
      .post(`${config.API_URL}/api/signin`, user, { withCredentials: true })
      .then((response) => {
        setLoggedInUser(response.data);
        console.log(
          "LoggedIn! in handleSignIn --  loggedInUser: ",
          loggedInUser
        );
        history.push("/map");
      })
      .catch((err) => {
        console.log("burned tosti:", err);
        setError(err.response.data);
      });
  };

  const handleLogout = (event) => {
    console.log("--here in handlelogout");
    axios
      .post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
      .then((response) => {
        setLoggedInUser(null);
        console.log("Logout post | loggedinUser: ", response);
        history.push("/");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log("error while logging out", err);
      });
  };

  //delete a mapitem
  const handleDelete = (mapitemId) => {
    console.log("here in the handle delelte ", mapitemId, messageDel);
    axios
      .delete(`${config.API_URL}/api/mapitems/${mapitemId}`)
      .then(() => {
        setMessageDel("Mapitem succesfully deleted");
        let filteredMapitem = mapitems.filter((mapitem) => {
          return mapitem._id !== mapitemId;
        });
        updateMapitems(filteredMapitem);

        history.push("/map");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log("error while deleting mapitem", err);
      });
  };



  return (
    <div className="App">
      <div className="gradient-background">
        <MyNav onlogout={handleLogout} user={loggedInUser} />

        {/* message when something is deleted. Does not work yet; do not get null afterwards */}
        {/* {                
          message && <p>message: {message}</p>        
        } */}
        
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => (
              <Home user={loggedInUser} {...routeProps} />
            )}
          />
          <Route
            path="/signin"
            render={(routeProps) => {
              return (
                <SignIn
                  error={error}
                  onSignIn={handleSignIn}
                  {...routeProps}
                  guide="fox"
                />
              );
            }}
          />
          <Route
            path="/signup/:guide"
            render={(routeProps) => {
              return (
                <SignUp error={error} onSignUp={handleSignUp} {...routeProps} />
              );
            }}
          />
          <Route
            path="/profile"
            render={(routeProps) => {
              return <Profile user={loggedInUser} {...routeProps} />;
            }}
          />
          <Route
            path="/mapdetails/:mapitemId"
            render={(routeProps) => {
              return (
                <MapDetails
                  error={error}
                  user={loggedInUser}
                  onDelete={handleDelete}
                  {...routeProps}
                />
              );
            }}
          />

          <Route
            path="/map/create"
            render={(routeProps) => {
              return <AddMapItem user={loggedInUser} {...routeProps} />;
            }}
          />

          <Route
            path="/map/edit/:mapitemId"
            render={(routeProps) => {
              return (
                <EditMapItem user={loggedInUser} mapitems={mapitems} {...routeProps} /> );
            }}
          />    

          <Route
            path="/map"
            render={(routeProps) => {
              return ( 
                <MyMap user={loggedInUser} {...routeProps} /> );
            }}
          />

          <Route
            path="/about"
            render={() => {
              return <About user={loggedInUser} />;
            }}
          />
        </Switch>
      </div>
      <div className="empty-triangle"></div>
    </div>
  );
}

export default App;
