import React, { Component } from "react";

class InputBox extends Component {
  state = {
    task: "",
  };

  handleOnChange = (e) => {
    let value = e.target.value;
    // console.log(value);
    this.setState({
      task: value,
    });
  };


  render() {
    let task = this.state.task;
    return (
      <div className="task-input m-2">
        <input
          type="text"
          value={task}
          onChange={(e) => {
            this.handleOnChange(e);
          }}
        />
        <div className="btn btn-primary m-2" 
             onClick={ () => {this.props.handleAddTask(this.state.task)}}>
          Add Task
        </div>
      </div>
    );
  }
}

export default InputBox;
