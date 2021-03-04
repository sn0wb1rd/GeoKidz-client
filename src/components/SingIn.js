import React from 'react';
import { Link } from 'react-router-dom';
import pinguin from "../images/pinguin-face.png";

function SignIn(props){
    
    return (
        <form onSubmit={props.onSignIn} className="form">
            <h3>Welcome my friend !</h3>
            <img src={pinguin} className="avatar-talk" alt="your avatar"/>
            <p className="avatar-text">To play the game, you first have to subscribe. After that, let's the game begin ! </p>
                <input name="username" type="text" className="register-input" placeholder="Username"/>
                <input type="password" name="password" className="register-input" placeholder="Password" />
                <button type="submit" className="btn centered-btn">Play</button>
                <Link  style={{marginLeft: '10px'}}  to="/signup">New here? Create an account here</Link>
        </form>
    )
}

export default SignIn