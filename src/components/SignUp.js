import React from 'react';
import pinguin from "../images/pinguin-face.png";
import fox from "../images/fox-face.png";
import unicorn from "../images/unicorn-34.png";

let getGuideImg = (guide) => {
  switch (guide) {
    case "fox":
      return fox;
    case "unicorn":
      return unicorn;
    case "pinguin":
      return pinguin;
  }
};

function SignUp(props){

    return (
        <form onSubmit={props.onSignUp} className="form">
          <h3>Welcome !</h3>
          <img src={getGuideImg(props.match.params.guide)} className="avatar-talk" alt="your avatar"/>
          <input name="guide" type="hidden" value={props.match.params.guide}></input>
          <p className="avatar-text">To play the game, you first have to subscribe. After that, let's the game begin ! </p>
              <div className="form-group">
                  <input name="username" type="text" className="register-input" id="InputUsername" placeholder="Username"/>
              </div>
              <div className="form-group">
                  <input name="password" type="password" className="register-input" id="InputPassword" placeholder="Password" />
              </div>
              <div className="form-group">
                  <input name="superpower" type="text" className="register-input" id="InputSuperpower" placeholder="Set your superpower here!" />
              </div>
              {/* error message by false signup: */}
              {                
                props.error && <p>{props.error.errorMessage}</p>        
              }
              <button type="submit" className="form-btn centered-btn">Play</button>
         </form>
    )
}

export default SignUp
