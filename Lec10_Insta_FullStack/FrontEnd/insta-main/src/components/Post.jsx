import React from 'react'

import "./Post.css";

const Post = ( props ) => {
    // console.log(props);
    let { name , caption , postImage , pImage } = props.post;
    // console.log(name , caption , pImage);
    return ( 
      <div className="feedsview-post">
          <div className="post-header">
              <div className="post-profile-image">
                  <img src={pImage} alt=""/>
              </div>
              <div className="post-profile-name">
                  {name}
              </div>
          </div>
          <div className="post-image">
              <img src = {postImage} alt=""/>
          </div>
          <div className="post-stats">
    <div className="post-stats-name">{name}</div>
    <div className="post-stats-caption">{caption}</div>
          </div>
          <div className="post-comments"></div>
          <div className="post-add-comment">
              <input type="text"/>
              <div className="add-comment">POST</div>
          </div>
      </div>
     );
}
 
export default Post;