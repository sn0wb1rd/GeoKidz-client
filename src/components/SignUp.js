import React from 'react';

function SignUp(props){
    return (
        <form onSubmit={props.onSignUp}>
            <div className="form-group">
                <input name="username" type="text" className="form-control" id="InputUsername" placeholder="username"/>
            </div>
            <div className="form-group">
                <input name="password" type="password" className="form-control" id="InputPassword" placeholder="password" />
            </div>
            <button type="submit" className="btn btn-primary">Join the game!</button>
        </form>
    )
}

export default SignUp