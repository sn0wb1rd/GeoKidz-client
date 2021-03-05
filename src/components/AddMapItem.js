import React from "react";

const AddMapItem = (props) => {
  console.log('in addmapitem  Props: --', props.match.user)

// // check if the user is loggedin for showing the page
// if (!user) {return <Redirect to={'/'} /> }

  return (
    <div>

       this is the page: add mapItems
       <form>
            <div className="form-group">
                <input name="password" type="password" className="register-input" id="InputPassword" placeholder="Password" />
            </div>
            <div className="form-group">
                <input name="itemname" type="text" className="register-input" id="ItemName" placeholder="Give your new treasure a name!"/>
            </div>
            <div className="form-group">
                <input name="password" type="password" className="register-input" id="InputPassword" placeholder="Password" />
            </div>
            <div className="form-group">
                <input name="superpower" type="text" className="register-input" id="InputSuperpower" placeholder="Set your superpower here!" />
            </div>
            <button type="submit" className="btn centered-btn">Add Treasure!</button>
        </form>


     </div>
  );
};

export default AddMapItem;