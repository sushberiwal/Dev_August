import React, { Component } from "react";
import Profile from "./Profile";
import ProfileList from "./ProfileList";
import "./ProfileView.css";

import axios from "axios";

class ProfileView extends Component {
  state = {
    currentView: "SUGGESTIONS",
    userList: [
      { id: 1, name: "test name", handle: "test handle 2" },
      { id: 2, name: "test name", handle: "test handle 2" },
      { id: 3, name: "test name", handle: "test handle 2" },
    ],
  };

  changeView = async (view)=>{
      if(view == "SUGGESTIONS" && this.state.currentView != "SUGGESTIONS"){  
        this.setState({
              currentView :view,
              userList :  [
                { id: 1, name: "test name", handle: "test handle 2" },
                { id: 2, name: "test name", handle: "test handle 2" },
                { id: 3, name: "test name", handle: "test handle 2" },
              ]
          })
      }
      else if(view == "REQUESTS" && this.state.currentView != "REQUESTS"){
        let requestObj = await axios.get("http://localhost:3000/user/request/80b5f987-6e55-4264-9245-5fd75faa92e7")
        let pendingRequests = requestObj.data.data;
        this.setState({
            currentView :view,
            userList : pendingRequests
        })
      }
      else if(view == "FOLLOWING" && this.state.currentView != "FOLLOWING"){
        let followingObj =await axios.get("http://localhost:3000/user/following/80b5f987-6e55-4264-9245-5fd75faa92e7")
        let following = followingObj.data.data;
        this.setState({
            currentView :view,
            userList : following
        })
      }
      else if(view == "FOLLOWERS" && this.state.currentView != "FOLLOWERS"){
        let followerObj =await axios.get("http://localhost:3000/user/follower/80b5f987-6e55-4264-9245-5fd75faa92e7")
        let followers = followerObj.data.data;
        this.setState({
            currentView :view,
            userList : followers
        })
      }
  }

  render() {
    return (
      <div className="profile-view">
        <Profile changeViewHandler = {this.changeView} />
        <ProfileList
          view={this.state.currentView}
          userList={this.state.userList}
        />
        
      </div>
    );
  }
}

export default ProfileView;
