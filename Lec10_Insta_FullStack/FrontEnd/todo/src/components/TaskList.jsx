import React, { Component } from "react";
import Task from "./Task";

// class component => cc

class TaskList extends Component {
  
  render() {    
    let tasks = this.props.tasks;
    let deleteTask = this.props.handleDeleteTask;
    
    return (
      <React.Fragment>
        {tasks.map((task) => {
          return <Task key={task.id} 
                       task={task} 
                       handleDeleteTask = {deleteTask} />;
        })}
      </React.Fragment>
    );
  }
}

export default TaskList;
