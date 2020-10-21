import React, { Component } from "react";
import Task from "./Task";

// class component => cc

class TaskList extends Component {
  state = {
    tasks: [
      { id: 1, task: "Learn ES6" },
      { id: 2, task: "Learn React" },
      { id: 3, task: "Learn javascript" },
      { id: 4, task: "Learn angular" },
    ],
  };

  deleteTask = (id) => {
    console.log("delete handle function called !!");
    let filteredTasks = this.state.tasks.filter((task) => {
      return task.id != id;
    });

    this.setState({
      tasks: filteredTasks,
    });
  };

  render() {
    let tasks = this.state.tasks;

    return (
      <React.Fragment>
        {tasks.map((task) => {
          return <Task key={task.id} task={task} handleDeleteTask = {this.deleteTask} />;
        })}
      </React.Fragment>
    );
  }
}

export default TaskList;
