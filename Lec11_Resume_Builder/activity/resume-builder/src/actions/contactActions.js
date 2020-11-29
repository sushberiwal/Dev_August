export const updateContact = (contactDetails) =>{

    

    return (dispatch , getState , {getFirebase , getFirestore}) =>{
        // aasync taskss


        dispatch({type:"UPDATE_CONTACT" , contactDetails : contactDetails})
    }

}