import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import axios from "axios";
import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import Profile from './components/profile';
import Settings from './components/settings';

class App extends Component {
  state = {  
    isAuth:false
  }

  login =()=>{
    // this.setState({
    //   isAuth:true
    // })
    window.location = "/auth/google";
  }

  logout = ()=>{
    console.log("logout fired !");
    axios.get("/auth/logout").then( ()=>{
      window.location = "/";
    } )
  }

  componentDidMount = ()=>{
    axios.get("/auth/confirmLogin").then( (data)=>{
      if(data.data.isAuth){
        this.setState({
          isAuth:true
        })
      }
    });
  }


  render() { 
    let {isAuth} = this.state; 
    let login = this.login;
    let logout = this.logout;
    return (  
    <React.Fragment>
      <Navbar isAuth = {isAuth} login={login} logout={logout} ></Navbar>
      <Switch>
        
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <Route path="/profile" exact>
          {isAuth ? <Profile></Profile> : <Redirect to="/"></Redirect> }
        </Route>
        <Route path="/settings" exact>
        {isAuth ? <Settings></Settings> : <Redirect to="/"></Redirect> }
        </Route>

      </Switch>
    </React.Fragment>
    );
  }
}
 
export default App;