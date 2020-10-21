//imrc
import React, { Component } from 'react'

// functional component
// sfc
const Task = (props) => {
    
    let {task} = props;

    return ( 
        <div className="task d-flex m-2">
            <div className="task-text">{task.task}</div>
            <div className="btn btn-danger m-2">X</div>
        </div>
     );
}
 
export default Task;
