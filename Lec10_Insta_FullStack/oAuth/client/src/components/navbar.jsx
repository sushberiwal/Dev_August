import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  let { isAuth , login , logout } = props;
  return (
    <div className="navlinks">
      {isAuth ? (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/" onClick = {logout}>Logout</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/" onClick = {login}>Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
