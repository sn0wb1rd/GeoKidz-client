import React, { useState, useEffect } from 'react';
import { Switch, Route, useParams } from "react-router-dom";
import axios from 'axios';
import config from './config'
import Home from "./components/Home"
import SignIn from "./components/SingIn";
import SignUp from "./components/SignUp";




function App() {
    const [loggedInUser, setLoggedInUser]  = useState(null)
    const [error, setError]  = useState(null)
    


const handleSignUp = (event) => {
  event.preventDefault()
  let user = {
    username: event.target.username.value,
    password: event.target.password.value,
  }

  axios
    .post(`${config.API_URL}/api/signup`,user)
    .then((response) => {
      setLoggedInUser(response.data)
      props.history.push('/')   
    })
    .catch((err) => {
      setError(err)
    })

}


  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} 

        />
        <Route path="/signin" component={SignIn}

        />
        <Route path="/signup" render={
          (routeProps) => {
            return <SignUp onSignUp=
            {handleSignUp} {...routeProps}
            />
        }}/>
      </Switch>
    </div>
  );
}

export default App;
