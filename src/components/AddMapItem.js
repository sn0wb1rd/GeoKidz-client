import React from "react";


function AddMapItem (props) {
  // console.log('in addmapitem  Props: --', props)
  const {user, onAdd } = props
  // console.log(onAdd)
 

// // check if the user is loggedin for showing the page
// if (!user) {return <Redirect to={'/'} /> }


  return (
    <div>
       this is the page: add mapItems
       Welcome 
       <form onSubmit={onAdd} className="form">
            <div className="form-group">
                <input name="image" type="text" className="register-input" id="Inputimage" placeholder="image url" />
            </div>
            <div className="form-group">
                <input name="itemname" type="text" className="register-input" id="ItemName" placeholder="Give your new treasure a name!"/>
            </div>
            <div className="form-group">
                {/* schould only be a non-editble field with only placeholder with the loggedin user */}
                <input name="owner" type="text" className="register-input" id="Owner" placeholder="Owner" />
            </div>
            <div className="form-group">
                <input name="locdesc" type="text" className="register-input" id="LocationDescription" placeholder="Tell something about the location. Don't make it too easy for the finder!" />
            </div>   
            {/* here comes the lat and long. stm like value={lat}
            Hidden, but can be passed in the onSubmit of the form */}
            <input name="lat" type="hidden" ></input> 
            <input name="long" type="hidden" ></input>        
            <button type="submit" className="btn centered-btn">Add Treasure!</button>
        </form>
     </div>
  );
};

export default AddMapItem;