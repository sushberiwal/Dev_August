import React, { Component } from 'react';
import FeedsView from './FeedsView';
import ProfileView from './ProfileView';
import "./UserView.css";

const UserView = () => {
    return ( 
        <div className="user-view">
            <ProfileView />
            <FeedsView />
        </div>
     );
}
 
export default UserView;
