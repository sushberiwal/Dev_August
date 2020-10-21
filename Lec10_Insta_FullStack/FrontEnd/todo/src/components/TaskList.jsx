import React, { Component } from 'react'
import Task from './Task';


// class component => cc

class TaskList extends Component {
    state = { 
        tasks : [ {id:1 , task : "Learn ES6"} ,
                  {id:2 , task : "Learn React"},
                  {id:3 , task:"Learn javascript"} ,
                  {id:4 , task:"Learn angular"}]
     }
    
    
    render() {

        let tasks = this.state.tasks;

        return ( 
            <React.Fragment>
                { tasks.map(  (task) =>{
                   return <Task key = {task.id}  task = {task} /> 
                })}    
            </React.Fragment>
         );
    }
}
 
export default TaskList;