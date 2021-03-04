import React from "react";
import { Link } from 'react-router-dom';

const MyDetails = () => {
  return (
    <div>

        <Link to="/signin">SignIn </Link>
       <Link to="/signup">SignOut </Link>


    </div>
  );
};

export default MyDetails;