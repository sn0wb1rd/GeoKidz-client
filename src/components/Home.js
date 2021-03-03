import React from "react";
import { Link } from 'react-router-dom'


const Home = () => {

    return (
        <div>
            this is the homepage
            <Link to='/signin'> Welcome
            </Link>
        </div>
    )
}

export default Home