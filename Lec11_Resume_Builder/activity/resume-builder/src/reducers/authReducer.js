import { initialState } from "./initialState"


export const authReducer = ( state = initialState.auth , action) =>{
    if(action.type == "LOGOUT"){
            return{ 
                   auth : {isAuth : false , user : null}
               }
           }
    return state;
}