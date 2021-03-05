import React, { useState, useEffect } from "react";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import config from "./config";
import Home from "./components/Home";
import SignIn from "./components/SingIn";
import SignUp from "./components/SignUp";
import MyNav from "./components/MyNav";
import MyMap from "./components/MyMap";
import MapDetails from "./components/MapDetails"
import AddMapItem from "./components/AddMapItem"
import About from "./components/About";

function App(props) {
  const [loggedInUser, setLoggedInUser]  = useState(null)
  const [mapitems, updateMapitems] = useState([])
  const [error, setError]  = useState(null)
  const history = useHistory(); 
  console.log('LoggedInuser: ', loggedInUser)



  // This will run just once after the first render and never again
  // Like componentDidMount
  useEffect(() => {
    if (loggedInUser === null) {
      axios
        .get(`${config.API_URL}/api/user`, {withCredentials:true})
        .then((response) => {
          setLoggedInUser(response.data)
          console.log('in useEffect loggedinuser: ', loggedInUser)
        })          
        .catch((err) => {
          console.log('In Appjs, useEffect error with useeffect since loggeninuser is null')
          setError(err.response.data) 
      })       
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
        history.push('/map')
      })
      .catch((err) => {
        // setError(err)
        console.log('burned tosti', err)
        setError(err.response.data)
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
        console.log('LoggedIn! in handleSignIn --  loggedInUser: ', loggedInUser)
        history.push('/map') 
      })
      .catch((err) => {
        console.log('burned tosti:', err)
        setError(err.response.data)        
      })
  }

  const handleLogout = (event) => {
    console.log('--here in handlelogout')
    axios
      .post(`${config.API_URL}/api/logout`, {}, {withCredentials: true})
      .then((response) => {
        setLoggedInUser(null)
        console.log('Logout post | loggedinUser: ', response)
        history.push('/')
      })
      .catch((err) => {
        setError(err.response.data)  
        console.log('error while logging out', err)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('here in the handleSubmit!')
    // when new mapitem is created, the first founder is same as owner
    let newObjhistory = {
      finder: loggedInUser.username,
      lat: 52.321213, // dummies
      long: 4.838725, // dummies
    }
    let mapitem = {
      itemname: event.target.itemname.value,
      image: event.target.image.value,
      owner: loggedInUser.username,
      locdesc: event.target.image.value,
      objhistory: newObjhistory,
    }
    console.log('in Appjs in handleSubmit -mapitem-- ', mapitem)

    axios
    .post(`${config.API_URL}/api/create`, mapitem, {withCredentials: true})
    .then((response) => { 
      console.log('in Appjs handleSubmit res data: ', response.data)
      updateMapitems(response.data) })
    .catch(() => {
      setError(err.response.data)  
      console.log('burned tosti in post create item:', err)
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
              return <SignIn error={error} onSignIn={handleSignIn} {...routeProps} guide="fox"/>
            }}
          />
          <Route
            path="/signup/:guide"
            render={(routeProps) => {
              return <SignUp error={error} onSignUp={handleSignUp} {...routeProps} />
            }}
          />
          <Route
            path="/mapdetails"
            render={(routeProps) => {
              return <MapDetails user={loggedInUser} {...routeProps} />
            }}
          />

          <Route 
            path="/map/create" 
            render={(routeProps) => {
              return <AddMapItem onAdd={handleSubmit} user={loggedInUser} {...routeProps}/>
            }}            
           />       


          <Route path="/map" render={(routeProps) => {
              return <MyMap user={loggedInUser} {...routeProps} />
            }}
          />

          <Route
            path="/about"
            render={() => {
              return <About user={loggedInUser} />
            }}
          />

      </Switch>
      </div>
      <div className="empty-triangle"></div>
    </div>
  );
}

export default App;
