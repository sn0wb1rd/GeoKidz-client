import React from "react";
import { Link } from 'react-router-dom';

const MyDetails = (props) => {
  console.log('in mapdetails Props: --', props)
  // const {user} = props
  console.log(props.user)




  return (
    <div>

       this is the page: mapdetails

     </div>
  );
};

export default MyDetails;