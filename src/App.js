import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home"
import SignIn from "./components/SingIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} 

        />
        <Route path="/signin" component={SignIn}

        />
        <Route path="/signup" component={SignUp}

        />


      </Switch>
    </div>
  );
}

export default App;
