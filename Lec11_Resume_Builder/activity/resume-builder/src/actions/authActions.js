import { initialState } from "../reducers/initialState";



export const login = (userDetails)=>{

    return (dispatch , getState , {getFirebase , getFirestore}) =>{
        // async tasks

        // id , pw => db => user => login // login failed
        let firebase = getFirebase(); // auth functions getFirebase;

        firebase.auth().signInWithEmailAndPassword(userDetails.email ,userDetails.password).then( obj =>{
            console.log(obj.user);
            dispatch({ type:"LOGIN"  , userDetails : userDetails });
        })
        .catch( err =>{
            dispatch({type:"LOGIN_FAILED" , error : err.message});
        })
    }
    
    
}

export const logout = () =>{


    return (dispatch , getState , {getFirebase , getFirestore}) =>{
         // async tasks

         let firebase = getFirebase();

         firebase.auth().signOut().then(obj => {
             dispatch({type:"LOGOUT"} );
         })
         .catch(err =>{
             dispatch({type:"LOGOUT_FAILED" , error:err.message})
         })

    }
    
}

export const signup = (userDetails)=>{


    return (dispatch , getState , {getFirebase , getFirestore}) =>{
        console.log(userDetails);
        let firebase = getFirebase();
        let firestore = getFirestore();
        let uid;
        firebase.auth().createUserWithEmailAndPassword(userDetails.email , userDetails.password)
        .then(obj =>{
            console.log(obj.user);
            uid = obj.user.uid;
            return firestore.collection("users").doc(obj.user.uid).set({
                firstName : userDetails.fname ,
                lastName : userDetails.lname ,
                email: userDetails.email,
            })
        })
        .then(()=>{
            return firestore.collection("resumes").doc(uid).set({
                ...initialState
            })
        }).then(()=>{
            console.log("user created succesfulyy");
            dispatch({type:"SIGNUP"});
        })
        .catch(err=>{
            dispatch({type:"SIGNUP_FAILED" , error : err.message})
        })



    }
}