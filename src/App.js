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
    .post(`${config.API_URL}/api/signup`, user)
    
    .then((response) => {
      setLoggedInUser(response.data)
      console.log('login -- ', loggedInUser)
      // after signin, go back to homepage
      // props.history.push('/')   
    })
    .catch((err) => {
      // setError(err)
      console.log('burned tosti')
    })

}


  return (
    <div className="App">
      <div className="gradient-background">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route
            path="/signup"
            render={(routeProps) => {
              return <SignUp onSignUp={handleSignUp} {...routeProps} />;
            }}
          />
        </Switch>
      </div>
      <div class="empty-triangle"></div>
    </div>
  );
}

export default App;
