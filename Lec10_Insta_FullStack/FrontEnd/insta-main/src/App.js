import React from "react";
import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Setting from "./components/Settings";
import UserView from "./components/UserView";

// jsx => js

function App() {
  return (



    <React.Fragment>
      <Router>
          <Header />
        <Switch>
          <Route path="/" exact>
            <UserView />
          </Route>
          <Route path="/settings" exact>
            <Setting />
          </Route>
          <Redirect to="/">
            <UserView />
          </Redirect>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
