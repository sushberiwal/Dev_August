import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/about';
import Contact from './components/contact';
import Education from './components/education';
import Header from './components/header';
import Landing from './components/landingPage';
import Register from './components/register';
import SignIn from './components/signin';
import Templates from './components/templates';


function App() {
  return (
    <React.Fragment>
    <Header />
    <Switch>
      <Route path="/" exact>
        <Landing></Landing>
      </Route>
      <Route path="/templates" exact>
        <Templates></Templates>
      </Route>
      <Route path="/about" exact>
        <About></About>
      </Route>
      <Route path="/register" exact>
        <Register></Register>
      </Route>
      <Route path="/signin" exact>
        <SignIn></SignIn>
      </Route>
      <Route path="/contact" exact component={Contact}></Route>
      <Route path="/education">
        <Education></Education>
      </Route>

    </Switch>
    </React.Fragment>
  );
}

export default App;
