import React, { Component } from 'react'
import "./navbar.css"
const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="insta-logo" />
            </div>
            <div className="navbar-search">
                <input type="text" value="Search"/>
            </div>
            <div className="navbar-profile">Profile</div>
        </div> 
    );
}
 
export default NavBar;