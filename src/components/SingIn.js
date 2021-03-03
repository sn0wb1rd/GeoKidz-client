import React from 'react';
import { Link } from 'react-router-dom'

function SignIn(props){
    return (
        <form className="form">
            <h3>Welcome my friend !</h3>
            <img src="pinguin-face.png" className="avatar-talk" alt="your avatar"/>
            <p className="avatar-text">To play the game, you first have to subscribe. After that, let's the game begin ! </p>
                <input type="text" className="register-input" placeholder="Username"/>
                <input type="password" className="register-input" placeholder="Password" />
                <button type="submit" className="btn centered-btn">Play</button>
                <Link  style={{marginLeft: '10px'}}  to="/signup">New here? Create an account here</Link>
        </form>
    )
}

export default SignIn