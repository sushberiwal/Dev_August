import React, { Component } from "react";
import axios from 'axios';

import "./Profile.css";

class Profile extends Component {
  state = {
    name: "test name",
    handle: "testhandle",
    bio: "testbio",
    pImage: "profile.png",
    postCount: 10,
    followerCount: 100,
    followingCount: 20,
    requestCount: 5,
  };

  async componentDidMount() {
    // api se fetch 
      let userObj = await axios.get("http://localhost:3000/user/80b5f987-6e55-4264-9245-5fd75faa92e7");
      let user = userObj.data.user;
      let requestObj = await axios.get("http://localhost:3000/user/request/80b5f987-6e55-4264-9245-5fd75faa92e7")
      let pendingRequests = requestObj.data.data;
      let followingObj =await axios.get("http://localhost:3000/user/following/80b5f987-6e55-4264-9245-5fd75faa92e7")
      let followerObj =await axios.get("http://localhost:3000/user/follower/80b5f987-6e55-4264-9245-5fd75faa92e7")
      let following = followingObj.data.data;
      let followers = followerObj.data.data;
      
      this.setState({
          name : user.name,
          handle : user.handle,
          bio : user.bio,
          pImage : "profile.png",
          postCount: 10,
          followerCount : followers.length,
          followingCount : following.length,
          requestCount : pendingRequests.length
      })

  }

  render() {
    let {
      name,
      handle,
      bio,
      pImage,
      postCount,
      followerCount,
      followingCount,
      requestCount,
    } = this.state;

    let changeView = this.props.changeViewHandler;

    return (
      <div className="profile">
        <div className="profile-details">
          <div className="profile-image">
            <img src={pImage} alt="profile.png" />
          </div>
          <div className="profile-name">{name}</div>
          <div className="profile-handle">{handle}</div>
          <div className="profile-bio">{bio}</div>
        </div>
        <div className="profile-stats">
          <div className="post">
            <div className="count">{postCount}</div>
            POST
          </div>
          <div className="follower">
            <div className="count">{followerCount}</div>
            FOLLOWERS
          </div>
          <div className="following">
            <div className="count">{followingCount}</div>
            FOLLOWING
          </div>
        </div>
        <div className="profile-info">
          <div className="suggestions" onClick={ ()=> {changeView("SUGGESTIONS")} }>SUGGESTIONS</div>
          <div className="request" onClick = { () =>{ changeView("REQUESTS") } } >REQUEST  {requestCount}</div>
          <div className="follower" onClick = { () =>{ changeView("FOLLOWERS") } }>FOLLOWERS</div>
          <div className="following" onClick = { () =>{ changeView("FOLLOWING") } }>FOLLOWING</div>
        </div>
      </div>
    );
  }
}

export default Profile;
