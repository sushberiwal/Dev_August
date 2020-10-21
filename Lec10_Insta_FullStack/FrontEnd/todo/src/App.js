import React, { Component } from 'react';
import './App.css';
import InputBox from './components/InputBox';
import TaskList from './components/TaskList';



class App extends Component {

  state = {
    tasks: [
      { id: 1, task: "Learn ES6" },
      { id: 2, task: "Learn React" },
      { id: 3, task: "Learn javascript" },
      { id: 4, task: "Learn angular" }
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

  
  addTask = (task) =>{
    if(task){
      let tasks = this.state.tasks; // [  obj , obj , obj , obj    ];
      let newTask = {id : tasks.length+1 , task:task};
      let newTasks = [ ...tasks , newTask ];
      this.setState({
          tasks : newTasks
      })
    }
  }


  render() { 
    let tasks = this.state.tasks;
    let deleteTask = this.deleteTask;
    return ( 
      <React.Fragment>
    <InputBox handleAddTask = { this.addTask } />
    <TaskList tasks = {tasks} handleDeleteTask = {deleteTask} />    
    </React.Fragment>
     );
  }
}
 
export default App;
