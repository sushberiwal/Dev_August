import React, { Component } from "react";
import Profile from "./Profile";
import ProfileList from "./ProfileList";
import "./ProfileView.css";

class ProfileView extends Component {
  state = {};
  render() {
    return (
      <div className="profile-view">
        <Profile />
        <ProfileList />
      </div>
    );
  }
}

export default ProfileView;
