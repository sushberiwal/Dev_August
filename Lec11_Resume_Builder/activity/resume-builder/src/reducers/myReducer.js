import { initialState } from "./initialState";

export function myReducer(state = initialState , action ){
    console.log(state);
    return state;
}