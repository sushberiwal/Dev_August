import React from "react";
import { connect } from "react-redux";
import {auth, provider} from "../firebase/fbconfig";

const handleLogin = (login) => {

    // console.log(auth.currentUser);
    // auth.signOut();

    // sample data //
    // signin => user data => login=>
    
    auth.signInWithPopup(provider).then( (user)=>{
        let {displayName , email} = user.user;
            let userDetails = {
                displayName,
                email
            }
            login(userDetails);
    })
    .catch( (error) =>{
        console.log(error);
    });


};

const SignIn = (props) => {
  return <button onClick={ () => {handleLogin(props.login)} }> Sign In With Google </button>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.isAuth,
  };
};


const mapDispatchToProps = (dispatch) =>{
    return {
        login : (userDetails) => { dispatch({ type:"LOGIN"  , userDetails : userDetails  }) }
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(SignIn);
