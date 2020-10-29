import React from 'react';
import './App.css';
import Header from './components/Header';
import ProfileView from './components/ProfileView';

// jsx => js

function App() {
  return ( 
  <React.Fragment>
  <Header /> 
  <ProfileView />
  </React.Fragment>);
}



export default App;
