//imrc
import React, { Component } from 'react'


// functional component => no state available 
// sfc
const Task = (props) => {
    
    let {task , handleDeleteTask} = props;

    return ( 
        <div className="task d-flex m-2">
            <div className="task-text">{task.task}</div>
            <div className="btn btn-danger m-2" onClick = { () => {handleDeleteTask(task.id)}  } >X</div>
        </div>
     );
}
 


export default Task;
