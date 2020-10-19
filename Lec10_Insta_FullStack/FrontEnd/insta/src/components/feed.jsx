import React, { Component } from 'react'
import Post from './post'
import Profile from './profile'
import "./feed.css";
const Feed = () => {
    return(
        <div className="feeds">
            <div className="posts">
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
            <div className="user-profile">
            <Profile />
            </div>
            
        </div>
    );
}
 
export default Feed;