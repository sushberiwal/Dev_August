import React, { Component } from "react";
import "./profileList.css"

const ProfileList = (props) => {
  let users = props.users;
  let view = props.view;

  return (
    <div className="profile-list">
      <div className="view">{view}</div>
      {users.map((user) => {
        return (
          <div className="profile-list-item">
            <div className="name">{user.name}</div>
            <div className="handle">{user.handle}</div>
            <div className="bio">{user.bio}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileList;
