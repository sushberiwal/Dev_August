import axios from "axios";
import React, { Component } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

class App extends Component {
    state = {
        isAuth: false
    }
    logout = () => {
        axios.get("/auth/logout").then(() => {
            // this.setState({ isAuth: false });
            window.location = "/";
        })
    }
    login = () => {
        // this.setState({ isAuth: true })
        window.location = "/auth/google";
    }
    // every time the component renders 
    componentDidMount = () => {
        axios.get("/confirmLogin").then((res) => {
            let { data } = res;
            if (data.status) {
                this.setState({ isAuth: true });
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        let { isAuth } = this.state;
        return (
            <React.Fragment>
                <h1>Oauth Example </h1>
                {/* // Menu */}
                <Menu login={this.login} logout={this.logout} isAuth={isAuth}></Menu>
                {/* // current page */}
                <Switch>
                    <Route path="/setting" exact  >
                        {isAuth == true ? <Setting logout={this.logout}></Setting> : <Redirect to="/"></Redirect>}
                    </Route>
                    <Route path="/profile" exact >
                        {isAuth == true ? <Profile logout={this.logout}></Profile> : <Redirect to="/"></Redirect>}
                    </Route>
                    <Route path="/" >
                        <div> Welome Home</div>
                    </Route>
                </Switch>
            </React.Fragment>

        );
    }
}
const Menu = (props) => {

    return (
        <React.Fragment>
            <div>********************************</div>

            <ul>
                <li>
                    <Link to="/profile">profile</Link>
                </li>
                <li>
                    <Link to="/setting">Setting</Link>

                </li>
                <li>
                    {props.isAuth == true ? <button onClick={props.logout}>Logout</button> : <button onClick={props.login}>Login</button>}
                </li>
            </ul>
            <div>********************************</div>

        </React.Fragment>

    );
}
class Profile extends Component {
    // state = {}
    render() {
        return (<React.Fragment>
            <h2>Profile Page</h2>

        </React.Fragment>);
    }
}
const Setting = (props) => {

    // /function

    return (
        <React.Fragment>
            <h2>Setting Page</h2>
        </React.Fragment>
    );
}


export default App;