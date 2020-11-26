const { combineReducers } = require("redux");
const { authReducer } = require("./authReducer");
const { contactReducer } = require("./contactReducer");
const { documentReducer } = require("./documentReducer");
const { educationReducer } = require("./educationReducer");


export const myReducer = combineReducers({
    auth : authReducer,
    contactDetails : contactReducer ,
    educationDetails : educationReducer ,
    document : documentReducer
})
