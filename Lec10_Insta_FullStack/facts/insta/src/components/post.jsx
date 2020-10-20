import React, { Component, useState } from 'react'
import "./post.css";

const Post = () => {

    const [value , setValue] = useState("Enter your comment");
    
    function onChangeHandler(event){
        setValue(event.target.value)
    }

    
    return (  
        <div className="post">
            <div className="post-img">
                <img src="https://images.pexels.com/photos/3756800/pexels-photo-3756800.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""/>
            </div>
            <div className="post-actions">
                <div className="like">Like</div>
                <div className="comment">Comment</div>
            </div>
            <div className="post-info">
                <div className="post-user">
                <div className="post-username">sushberiwal</div>
                <div className="post-caption">First pic from iphone 11 !</div>
                </div>
                <div className="post-comments">
                    <div className="comment">
                        <div className="comment-name">Joseph</div>
                        <div className="comment-description">Nice pic love it 😄</div>
                    </div>
                    <div className="comment">
                    <div className="comment-name">Ryan</div>
                        <div className="comment-description">Wow Amazing ! 😄</div>
                    </div>
                    <div className="comment">
                    <div className="comment-name">Neeru</div>
                        <div className="comment-description">perfect ! 😄</div>
                    </div>
                </div>
            </div>
            <div className="post-input-comment">
                <input type="text" value={value} onChange = {onChangeHandler}/>
                <div className="send">Post</div>
            </div>
        </div>
    );
}
 
export default Post;