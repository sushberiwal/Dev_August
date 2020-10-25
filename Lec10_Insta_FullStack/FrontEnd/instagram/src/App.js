import './App.css';

import React from 'react';
import NavBar from './components/navbar';
import Profile from './components/profile';
import UserView from './components/UserView';

function App() {
  return (
    <React.Fragment>
    <NavBar />
    <UserView />
    </React.Fragment>
  );
}

export default App;
