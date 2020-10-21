import React, { Component } from 'react';
import './App.css';
import InputBox from './components/InputBox';
import TaskList from './components/TaskList';



class App extends Component {
  
  state = {
    task : ""
    }
  
  addTasks = (task)=>{
    this.setState({
      task:task
    })
  }

  

  render() { 
    let newTask = this.state.task;
    return ( 
      <React.Fragment>
    <InputBox handleAddTask = { this.addTasks } />
    <TaskList newTask = {newTask}/>    
    </React.Fragment>
     );
  }
}
 
export default App;
