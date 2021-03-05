import React from "react";

const AddMapItem = (onAdd) => {
 //if (!user) {return <Redirect to={'/'} /> }

  return (
    <div>
       this is the page: add mapItems
       <form onSubmit={onAdd}>
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
            <button type="submit" className="btn centered-btn">Add Treasure!</button>
        </form>
     </div>
  );
};

export default AddMapItem;