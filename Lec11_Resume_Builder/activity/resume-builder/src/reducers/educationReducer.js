const { initialState } = require("./initialState");

export const educationReducer = (state = initialState.educationDetails, action) =>{
    if(action.type == "UPDATE_EDUCATION"){
               return { 
                   educationDetails : {...action.educationDetails}
               }
           }
    return state;
}