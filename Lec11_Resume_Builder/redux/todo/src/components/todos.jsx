import React, { Component } from 'react'
import { connect } from 'react-redux';
import AddTodo from './addTodo';


class Todos extends Component {
    
     deleteTodo = (id) =>{
        console.log(this.props);

        // let filteredTodos = this.state.todos.filter(  todo =>{
        //      return todo.id != id;
        //  })
        //  this.setState({
        //      todos:filteredTodos
        //  })
     }

    render() { 
        return ( 
            <React.Fragment>
            <AddTodo addTodo = {this.props.addTodos}></AddTodo>
            <div className="todos">
                {this.props.todos.map( (todo) =>{
                    return <div className="todo" key={todo.id} onClick = { () => this.deleteTodo( todo.id )  }> {todo.todo} </div>
                }  )}
            </div>
            </React.Fragment>
         );
    }
}

const mapStateToProps = (state) => {
    return { 
        todos : state.todos
     }
}




const mapDispatchToProps = (dispatch) =>{
    return {
        addTodos : (todo) => {   dispatch( { type:"ADD_TODOS" , todo:todo })},
        deleteTodo : (id) => {   dispatch({type:"DELETE_TODO" , id:id})  }
    }
}
// connect(mapStateToProps) => high order component => 
// hoc => me bhejunga TODOS => hoc will insert state as a props to todos component !!
 
export default connect(mapStateToProps , mapDispatchToProps )(Todos);