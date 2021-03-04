import React, { useState, useEffect } from "react";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import config from "./config";
import Home from "./components/Home";
import SignIn from "./components/SingIn";
import SignUp from "./components/SignUp";
import Nav from "./components/Nav";


function App(props) {
  const [loggedInUser, setLoggedInUser]  = useState(null)
  const [error, setError]  = useState(null)
  const history = useHistory(); 
  console.log('LoggedInuser: ', loggedInUser)

  useEffect(() => {
    if (loggedInUser !== null) {
      history.push('/')
    }  
  }, [loggedInUser])

  // needed?
  useEffect(() => {
    if (loggedInUser !== null) {
      axios
        .get(`${config.API_URL}/api/user`, {withCredentials:true})
        .then((response) => {
          // console.log('response get user -- ', response.data) 
          // setLoggedInUser(response.data)
        })
          
        .catch((err) => {console.log('error with useeffect --', err) })       
    }
  }, [loggedInUser])
    
  const handleSignUp = (event) => {
    event.preventDefault()
    let user = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    axios
      .post(`${config.API_URL}/api/signup`, user,  {withCredentials: true})      
      .then((response) => {
        setLoggedInUser(response.data)
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
          <Route
            path="/mapdetail"
            render={(routeProps) => {
              return <SignUp  />
            }}
          />
        </Switch>
      </div>
      <div className="empty-triangle"></div>
    </div>
  );
}

export default App;
