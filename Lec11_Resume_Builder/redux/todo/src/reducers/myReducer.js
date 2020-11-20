const initialState = {
    todos:[
        {id:1 , todo:"Learn ES6"},
        {id:2 , todo:"LEarn React"},
        {id:3 , todo:"Learn Javascript"},
        {id:4 , todo:"Learn Something"},
    ]
}

export function myReducer(state = initialState , action){
    if(action.type == "ADD_TODOS"){
        return {
            ...state ,
            todos:[...state.todos , {id:Math.random , todo:action.todo}]
        }
    }else if(action.type == "DELETE_TODO"){
        ////
    }
    else{
        return state;
    }
}