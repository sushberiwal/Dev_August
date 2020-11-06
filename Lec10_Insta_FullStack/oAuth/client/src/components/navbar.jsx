import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return <div className="navbar">
      <ul className="navbar-links">
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          {/* <li><NavLink to="/logout">Logout</NavLink></li> */}
      </ul>
      
  </div>;
};

export default Navbar;
