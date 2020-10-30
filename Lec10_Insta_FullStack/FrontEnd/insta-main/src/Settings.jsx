import React, { Component } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Settings.css";

class Setting extends Component {
  state = {
    name: "",
    handle: "",
    bio: "",
    phone: "",
    email: "",
    pImage: "",
    isPublic: "",
    isDisabled : true
  };


  fileUpload = React.createRef();

  async componentDidMount(){
    let userObj = await axios.get("http://localhost:3000/user/80b5f987-6e55-4264-9245-5fd75faa92e7");
    let user = userObj.data.user;
    let {name , handle , bio , phone , email , pImage , is_public } = user;
    console.log(user);
    this.setState({
        name:name,
        handle:handle , 
        bio:bio,
        phone:phone,
        email:email,
        pImage:pImage,
        isPublic: is_public,
        isDisabled:true 
    })
    
  }


  onChangeHandler = (event) =>{
    //   event.preventDefault();
      let id = event.target.id;
      let value = event.target.value;
      this.setState({
          [id]:value
      })
  }


  editHandler = () =>{
      if(this.state.isDisabled){
        this.setState({
            isDisabled : !this.state.isDisabled
        })
      }
      else{
          this.componentDidMount();
      }
      
  }

  handleSubmit = async (e) =>{
      e.preventDefault();
      let file = this.fileUpload.current.files[0];
      console.log(file);
      let formData = new FormData();  
      formData.append('photo', file);  
      formData.append('name' , this.state.name );
      formData.append('handle' , this.state.handle );
      formData.append('bio' , this.state.bio);
      let patchData =await axios.patch("http://localhost:3000/user/80b5f987-6e55-4264-9245-5fd75faa92e7" , formData);
      console.log(patchData);
      this.componentDidMount();
  }



  render() {
    let { name, handle, bio, phone, email, pImage, isPublic , isDisabled } = this.state;
    let onChangeHandler = this.onChangeHandler;
    return (
      <div className="settings d-flex justify-content-around">
        <div className="settings-profile-photo">
          <img src={pImage} alt="profile.png" />
          <input type="file" name="upload" id="uploadPhoto" ref = {this.fileUpload}/>
        </div>
        <div className="settings-profile-data ">
          <form onSubmit = { (e) => {this.handleSubmit(e)}}> 
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                NAME
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  value={name}
                  disabled={isDisabled}
                  onChange = { (e) => {onChangeHandler(e)}  }
                />
              </div>
            </div>
            
            <div className="form-group row">
              <label htmlFor="handle" className="col-sm-2 col-form-label">
                HANDLE
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="handle"
                  value={handle}
                  disabled={isDisabled}
                  onChange = { (e) => {onChangeHandler(e)}  }
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="bio" className="col-sm-2 col-form-label">
                BIO
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="bio"
                  value={bio}
                  disabled={isDisabled}
                  onChange = { (e) => {onChangeHandler(e)}  }
                />
              </div>
            </div>
            { isDisabled &&  <div className="edit btn btn-warning" onClick ={this.editHandler} > EDIT</div> }
            { !isDisabled && <div className="edit btn btn-warning" onClick ={this.editHandler} >CANCEL CHANGES</div> }
            
            <button type="submit" className="btn btn-primary">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Setting;
