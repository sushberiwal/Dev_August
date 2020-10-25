import React, { Component } from "react";
import axios from "axios";
import "./profile.css";

class Profile extends Component {
  state = {
    name: "",
    handle: "",
    pImage: "profile.png",
    followingCount: "",
    followerCount: "",
    postCount: "20",
    requestCount: "",
    currentView:"suggestions"
  };

  async componentDidMount() {
    try {
      let data = await axios.get(
        "http://localhost:3000/user/b71c8747-b6a6-4ee1-9009-f77fbe69ba4b"
      );
      console.log(data.data.data[0]);
      let user = data.data.data[0];
      let followingData = await axios.get(
        "http://localhost:3000/user/following/b71c8747-b6a6-4ee1-9009-f77fbe69ba4b"
      );
      let countOfFollowing = followingData.data.data.length;
      let followerData = await axios.get(
        "http://localhost:3000/user/followers/b71c8747-b6a6-4ee1-9009-f77fbe69ba4b"
      );
      let countOfFollowers = followerData.data.followers.length;
      let requestsData = await axios.get(
        "http://localhost:3000/user/request/b71c8747-b6a6-4ee1-9009-f77fbe69ba4b"
      );
      let requestCount = requestsData.data.data.length;
      this.setState({
        name: user.name,
        handle: user.handle,
        followingCount: countOfFollowing,
        followerCount: countOfFollowers,
        requestCount: requestCount,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    let {
      name,
      handle,
      followingCount,
      followerCount,
      postCount,
      requestCount,
      pImage
    } = this.state;

    let changeCurrentView = this.props.handleViewChange;

    return (
        <React.Fragment>
      <div className="profile-view">
        <div className="profile">
          <div className="profile-image">
            <img src={pImage} alt="profile.png" />
          </div>
          <div className="profile-name">{name}</div>
          <div className="profile-handle">{handle}</div>
          <div className="post-count">POSTS {postCount}</div>
          <div className="follower-count">FOLLOWERS {followerCount}</div>
          <div className="following-count">FOLLOWING {followingCount}</div>
        </div> 
        <div className="stats">
          <div className="stats-suggestions" onClick={ ()=>{changeCurrentView("suggestions")}}>Suggestions</div>
          <div className="stats-requests" onClick={ ()=>{changeCurrentView("requests")}}>Requests {requestCount}</div>
          <div className="stats-followers" onClick={ ()=>{changeCurrentView("followers")}}>Followers</div>
          <div className="stats-following" onClick={ ()=>{changeCurrentView("following")}}>Following</div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Profile;
