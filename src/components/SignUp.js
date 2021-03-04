import React from 'react';
import pinguin from "../images/pinguin-face.png";

function SignUp(props){
    console.log('Signup props-----', props)
    return (
        <form onSubmit={props.onSignUp} className="form">
        <h3>Welcome my friend !</h3>
        <img src={pinguin} className="avatar-talk" alt="your avatar"/>
        <p className="avatar-text">To play the game, you first have to subscribe. After that, let's the game begin ! </p>
            <div className="form-group">
                <input name="username" type="text" className="register-input" id="InputUsername" placeholder="Username"/>
            </div>
            <div className="form-group">
                <input name="password" type="password" className="register-input" id="InputPassword" placeholder="Password" />
            </div>
            <button type="submit" className="btn centered-btn">Play</button>
        </form>
    )
}

export default SignUp
