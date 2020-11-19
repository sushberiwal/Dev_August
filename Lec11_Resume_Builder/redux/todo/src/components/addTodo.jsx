import React, { Component } from 'react'
import { connect } from 'react-redux';

class AddTodo extends Component {
    state = { 
        todo:""
     }


     onChangeHandler = (e)=>{
         e.preventDefault();
         let value = e.target.value;
         this.setState({
             todo:value
         })
     }


     addTodoHandler = () =>{
        this.props.addTodo(this.state.todo);
        this.setState({
            todo:""
        })
     }

    render() { 
        return (
            <div className="add-todo">
                <input type="text" value={this.state.todo} onChange = {  (e) => {this.onChangeHandler(e)} }/>
                <button onClick={this.addTodoHandler}>Add TODO</button>
            </div>
          );
    }
}
 





//connect() => sfc


export default AddTodo;