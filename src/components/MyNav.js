import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Dropdown, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import list from "../images/list.svg";

const MyNav = (props) => {
  // console.log('in Nav | loggedinuser: --', loggedinuser)
  // console.log('in Nav | loggedinuser: --', loggedinuser)

  return (
    <Navbar>
      <Navbar.Brand>
        <Link to="/" className="no-style-link nav-element-padding">
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
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end nav-element-padding">
        <Dropdown>
          <Dropdown.Toggle variant="success" className="dropdown-button" id="dropdown-basic">
            <img src={list} alt="drop-menu" className="drop-menu" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="/about">About</Dropdown.Item>
            <Dropdown.Item>
              {props.user ? (
                <button onClick={props.onlogout} className="sub-menu">
                  Logout
                </button>
              ) : (
                <></>
              )}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
