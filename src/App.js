import React, { useState, useEffect } from "react";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import config from "./config";
import Home from "./components/Home";
import SignIn from "./components/SingIn";
import SignUp from "./components/SignUp";
import MyNav from "./components/MyNav";
import Map from "./components/Map";
import MapDetails from "./components/MapDetails"


function App(props) {
  const [loggedInUser, setLoggedInUser]  = useState(null)
  const [error, setError]  = useState(null)
  const history = useHistory(); 
  console.log('LoggedInuser: ', loggedInUser)

  // After sigin, redirect to the map page
  useEffect(() => {
    if (loggedInUser !== null) {
      history.push('/mapdetails')
    }  
  }, [loggedInUser])

  // This will run just once after the first render and never again
  // Like componentDidMount
  useEffect(() => {
    if (loggedInUser === null) {
      axios
        .get(`${config.API_URL}/api/user`, {withCredentials:true})
        .then((response) => {
          setLoggedInUser(response.data)
          console.log('in useEffect loggedin user: ', loggedInUser)
        })
          
        .catch((err) => {console.log('error with useeffect --', err) })       
    }
  }, [])
    
  const handleSignUp = (event) => {
    event.preventDefault()
    let user = {
      username: event.target.username.value,
      password: event.target.password.value,
      guide: event.target.guide.value,
      superpower: event.target.superpower.value,
    }
    console.log('user sigup: ---- ', user)

    axios
      .post(`${config.API_URL}/api/signup`, user,  {withCredentials: true})      
      .then((response) => {
        setLoggedInUser(response.data)
      })
      .catch((err) => {
        // setError(err)
        console.log('burned tosti', err)
      })

  }

  const handleSignIn = (event) => {
    event.preventDefault()
    let user = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    axios
      .post(`${config.API_URL}/api/signin`, user, {withCredentials: true})  
      .then((response) => {
        setLoggedInUser(response.data)
        console.log('LoggedIn! --  ', loggedInUser)
      })
      .catch((err) => {
        // setError(err)
        console.log('burned tosti:', err)
      })

  }

  const handleLogout = (event) => {
    console.log('--here in handlelogout')
    axios
      .post(`${config.API_URL}/api/logout`, {}, {withCredentials: true})
      .then((response) => {
        setLoggedInUser(null)
        console.log('logout post loggeinUser: ', response)

      })
      .catch(() => {

      })
  }

  return (
    <div className="App">
      <div className="gradient-background">
        <MyNav 
          onlogout={handleLogout}
          user={loggedInUser}         
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" render={(routeProps) => {
            return <SignIn onSignIn={handleSignIn} {...routeProps} guide="fox"/>
            }}
          />
          <Route
            path="/signup/:guide"
            render={(routeProps) => {
              return <SignUp onSignUp={handleSignUp} {...routeProps}  />
            }}
          />
          <Route
            path="/mapdetails"
            render={(routeProps) => {
              return <MapDetails  
              user={loggedInUser}  

              />
            }}
          />
          <Route path="/map" component={Map}/>
        </Switch>
      </div>
      <div className="empty-triangle"></div>
    </div>
  );
}

export default App;
