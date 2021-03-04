import React, { useState, useEffect } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import axios from "axios";
import config from "./config";
import Home from "./components/Home";
import SignIn from "./components/SingIn";
import SignUp from "./components/SignUp";
import Nav from "./components/Nav";

//test

function App() {
    const [loggedInUser, setLoggedInUser]  = useState(null)
    const [error, setError]  = useState(null)
    
  const handleSignUp = (event) => {
    event.preventDefault()
    let user = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    console.log(`${config.API_URL}/api/signup`)
    console.log(user)


    axios
      .post(`${config.API_URL}/api/signup`, {withCredentials: true})      
      .then((response) => {
        setLoggedInUser(response.data)
        // console.log('signup -- ', loggedInUser)
        // after signin, go back to homepage
        // props.history.push('/')   
      })
      .catch((err) => {
        // setError(err)
        console.log('burned tosti')
      })

  }

  const handleSignIn = (event) => {
    event.preventDefault()
    let user = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    console.log('in handlesignin user ---- ', user)
    console.log(`${config.API_URL}/api/signin`)
    console.log(user.username, user.password)

    axios
      .post(`${config.API_URL}/api/signin`, user)  
      .then((response) => {
        // setLoggedInUser(response.data)
        console.log('login -- ', loggedInUser)
        // after signin, go back to homepage
        // props.history.push('/')   
      })
      .catch((err) => {
        // setError(err)
        console.log('burned tosti', err)
      })

  }


  return (
    <div className="App">
      <div className="gradient-background">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" render={(routeProps) => {
            return <SignIn onSignIn={handleSignIn} {...routeProps} />
            }}
          />
          <Route
            path="/signup"
            render={(routeProps) => {
              return <SignUp onSignUp={handleSignUp} {...routeProps} />
            }}
          />
        </Switch>
      </div>
      <div className="empty-triangle"></div>
    </div>
  );
}

export default App;
