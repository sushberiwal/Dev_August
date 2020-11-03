import axios from 'axios';
import React, { Component } from 'react'

class CreatePost extends Component {
    state = { 
        caption : ""
     }

     uploadImage = React.createRef();


    onSubmitHandler = async (e)=>{
        e.preventDefault() //=> prevent unwanted page reload 
        let caption = this.state.caption;
        let uploadedImage = this.uploadImage.current.files[0];
        console.log(caption)
        console.log(uploadedImage);

        let formData = new FormData();  
        formData.append('postImage', uploadedImage);  
        formData.append('uid' , "80b5f987-6e55-4264-9245-5fd75faa92e7");
        formData.append('caption' , caption)
        await axios.post("http://localhost:3000/post" , formData);
        this.props.updatePosts();
    }

    onChangeHandler = (e) =>{
        let caption = e.target.value;
        this.setState({
            caption : caption
        })
    }

    render() { 

        return ( 
            <div className="create-post">
                <form onSubmit = { (e) => {this.onSubmitHandler(e)} }>
                <input type="file" name="post" id="postUpload" ref= {this.uploadImage}/>
                <input type="text" value = {this.state.caption} onChange = {(e) => {this.onChangeHandler(e)}} />
                <button type="submit">CREATE POST</button>
                </form>

            </div>
        );
    
    }
}
 
export default CreatePost;