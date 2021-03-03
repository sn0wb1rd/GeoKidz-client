import React from 'react';

function SignUp(props){
    return (
        <form>
            <div className="form-group">
                <input type="text" className="form-control" id="InputUsername" name="username" placeholder="username"/>
            </div>
            <div className="form-group">
                <input name="password" type="password" className="form-control" id="InputPassword" placeholder="password" />
            </div>
            <button type="submit" className="btn btn-primary">Join the game!</button>
        </form>
    )
}

export default SignUp