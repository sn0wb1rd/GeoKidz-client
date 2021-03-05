import React from "react";
import { Redirect } from 'react-router-dom';

const MyDetails = (props) => {
  console.log('in mapdetails Props: --', props.user)
  // const {user} = props
  // console.log(props.user)
  const {user} = props
  console.log('in Mapdetails | user ', user)
  
  // check if the user is loggedin for showing the page
  //if (!user) {return <Redirect to={'/'} /> }


  return (
    <div>

       this is the page: mapdetails
    
     </div>
  );
};

export default MyDetails;