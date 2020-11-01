import React from 'react';
import { NavLink } from 'react-router-dom';

import "./Header.css";

const Header = () => {
    return ( 
        <div className="header">
            <div className="header-image">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
            </div>
            <div className="header-navlinks">
                <ul className="header-navlinks-ul">
                    <li>
                        <NavLink to = "/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to = "/mypost">My Posts</NavLink>
                    </li>
                    <li>
                        <NavLink to = "/settings">Settings</NavLink>
                    </li>

                    <li>
                        <NavLink to = "/login">Authenticate</NavLink>
                    </li>
                </ul>
            </div>
        </div>
      );
}
 
export default Header;