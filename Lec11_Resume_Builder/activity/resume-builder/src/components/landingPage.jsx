import React, { Component } from 'react'
import "./landingPage.css";

import { Link } from 'react-router-dom';
import resume from '../static/images/resume.png';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';




class Landing extends Component {
    state = {  }

    getStartedHandler = () =>{
        console.log(this.props);
        let uid = this.props.firebaseAuth.uid;
        let data = this.props.firebaseData.resumes[uid];
        console.log(data);

        // dispatch ????
        
    }


    render() { 
        return ( 
            <div className="landing-page">
            <h1>Create a resume that stands out</h1>
            <p>Create a Resume that perfectally describes your skils and match job profile.</p>
            <div>
                    <button className="btn" onClick={this.getStartedHandler}>Get Started For Free</button>
            </div>
            <div className="logo">
                <img src={resume} alt=""/>
            </div>
        </div>
         );
    }
}


const mapStateToProps = (state)=>{
    return {
        firebaseAuth : state.firebase.auth ,
        firebaseData : state.firestore.data 
    };
}



export default compose(connect(mapStateToProps) ,firestoreConnect([{collection:"resumes"}]))(Landing);
