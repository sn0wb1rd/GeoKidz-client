import React from "react";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import list from "../images/list.svg";

const Nav = (props) => {
  // console.log('in Nav | loggedinuser: --', loggedinuser)
  // console.log('in Nav | loggedinuser: --', loggedinuser)

  return (
    <nav>
      <div>
        <Link to="/" className="no-style-link">
          Geokidz{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="20"
            fill="yellow"
            className="bi bi-geo-alt-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
        </Link>
      </div>
      <div className="horizontally-align-right">
        <img src={list} alt="drop-menu" className="drop-menu"
        />
        <NavDropdown id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">
            <Link className="sub-menu" to="/about">About</Link>
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="4.1">
            <Link className="sub-menu" to="/profile">Profile</Link>
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="4.4">
            {props.user ? (
              <button onClick={props.onlogout} className="sub-menu">Logout</button>
            ) : (
              <></>
            )}
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </nav>
  );
};

export default Nav;
