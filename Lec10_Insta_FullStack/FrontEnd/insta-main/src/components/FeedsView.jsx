import React, { Component } from "react";
import "./FeedsView.css";
import axios from "axios";
import Post from "./Post";
import CreatePost from "./CreatePost";

class FeedsView extends Component {
  state = {
    posts: [
      {
        pid: 1,
        uid: 2,
        name: "test test",
        caption: "Hey this is my first post !!",
        pImage:
          "https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
      {
        pid: 2,
        uid: 2,
        name: "test test",
        caption: "Hey this is my first post !!",
        pImage:
          "https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
      {
        pid: 3,
        uid: 3,
        name: "test test",
        caption: "Hey this is my first post !!",
        pImage:
          "https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
      {
        pid: 4,
        uid: 2,
        name: "test test",
        caption: "Hey this is my first post !!",
        pImage:
          "https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
    ]
  };


  async componentDidMount(){
      // api se posts fetch
      // backend => axios.get()
      let postData = await axios.get("http://localhost:3000/post");
      let posts = postData.data.data;

      console.log(posts);
      let uids  = posts.map((post) => {
          return post.uid;
      })
      console.log(uids);
      let users = [];
      for(let i=0 ; i<uids.length ; i++){
          let uid = uids[i];
          let userData = await axios.get(`http://localhost:3000/user/${uid}`);
          users.push(userData.data.user);
      }
      console.log(users);

      let newPosts = [];
      for(let i=0 ; i<posts.length ; i++){
          let post = {
              pid : posts[i].pid ,
              name : users[i].name ,
              caption : posts[i].caption ,
              pImage : users[i].pImage,
              postImage : posts[i].postImage,
          }
          newPosts.push(post);
      }
    //   console.log(userData);
      this.setState({
          posts : newPosts
      }) 
  }


  updatePosts = () =>{
      this.componentDidMount();
  }

  render() {
      let{ posts }= this.state;

    return (
        <React.Fragment>
        <div className="feeds-view">
            <h1>FEEDS</h1>
            <CreatePost updatePosts = {this.updatePosts} />
        <div className="posts">
            {posts.map( (post) =>{
                return <Post key = {post.pid} post ={post} />
            })}
            </div>
        </div>
        </React.Fragment>
    );
  }
}

export default FeedsView;
