import React, { Component } from "react";
import Profile from "./profile";
import ProfileList from "./profileList";
import axios from "axios";
import "./UserView.css";

class UserView extends Component {
  state = {
    currentView: "suggestions",
    lists: [],
  };

  changeCurrentView = async (view) => {
    if (view == "suggestions" && this.state.currentView != "suggestions") {
      this.setState({
        currentView: "suggestions",
        lists: [],
      });
    } else if (view == "requests" && this.state.currentView != "requests") {
      let requestsData = await axios.get(
        "http://localhost:3000/user/request/b71c8747-b6a6-4ee1-9009-f77fbe69ba4b"
      );
      let requests = requestsData.data.data;
      console.log(requests);
      this.setState({
        currentView: "requests",
        lists: [...requests],
      });
    } else if (view == "followers" && this.state.currentView != "followers") {
      let followerData = await axios.get(
        "http://localhost:3000/user/followers/b71c8747-b6a6-4ee1-9009-f77fbe69ba4b"
      );
      let followers = followerData.data.followers;
      this.setState({
        currentView: "followers",
        lists: [...followers],
      });
    } else if (view == "following" && this.state.currentView != "following") {
      let followingData = await axios.get(
        "http://localhost:3000/user/following/b71c8747-b6a6-4ee1-9009-f77fbe69ba4b"
      );
      let following = followingData.data.data;
      this.setState({
        currentView: "following",
        lists: [...following],
      });
    }
  };

  render() {
    return (
      <div className="user-view">
        <Profile handleViewChange={this.changeCurrentView} />
        <ProfileList users={this.state.lists} view={this.state.currentView} />
      </div>
    );
  }
}

export default UserView;
