import React from 'react';
import { Link } from 'react-router-dom';
import pinguin from "../images/pinguin-face.png";

function SignIn(props){
    return (
        <form className="form">
            <h3>Welcome my friend !</h3>
            <img src={pinguin} className="avatar-talk" alt="your avatar"/>
                <input type="text" className="register-input" placeholder="Username"/>
                <input type="password" className="register-input" placeholder="Password"/>
                <button type="submit" className="btn centered-btn">Play</button>
                <Link style={{marginLeft: '10px'}} to="/signup">New here? Create an account </Link>
        </form>
    )
}

export default SignIn;