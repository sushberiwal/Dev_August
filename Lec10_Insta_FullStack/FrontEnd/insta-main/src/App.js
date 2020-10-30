import React from "react";
import "./App.css";
import Header from "./components/Header";
import ProfileView from "./components/ProfileView";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Setting from "./Settings";

// jsx => js

function App() {
  return (
    <React.Fragment>
      <Router>
          <Header />
        <Switch>
          <Route path="/" exact>
            <ProfileView />
          </Route>
          <Route path="/settings" exact>
            <Setting />
          </Route>
          <Redirect to="/">
            <ProfileView />
          </Redirect>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
