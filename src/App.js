import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import SignIn from "./components/SingIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <div class="gradient-background">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
      <div class="empty-triangle"></div>
    </div>
  );
}

export default App;
