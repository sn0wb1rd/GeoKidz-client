import React from "react";
import { Link } from "react-router-dom";

function SignIn(props) {
  return (
    <form onSubmit={props.onSignIn} className="form">
      <h3>Login</h3>
      <div className="input-group">
        <input
          name="username"
          type="text"
          className="register-input"
          placeholder="Username"
        />
        <input
          name="password"
          type="password"
          className="register-input"
          placeholder="Password"
        />
      </div>
      <button type="submit" className="form-btn centered-btn">
        Play
      </button>
      {/* error message by false signin: */}
      {props.error && <p>{props.error.errorMessage}</p>}
      <Link style={{ marginLeft: "10px" }} to="/signup/fox">
        New here? Create an account
      </Link>
    </form>
  );
}

export default SignIn;
