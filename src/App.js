import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import ProceduresList from './components/ProceduresList';
import HospitalsList from './components/HospitalsList';
import Procedure from './components/Procedure';
import Hospital from './components/Hospital';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="content">
          <Route exact path="/procedures">
            <ProceduresList />
          </Route>
          <Route path="/procedures/:code">
            <Procedure />
          </Route>
          <Route exact path="/hospitals">
            <HospitalsList />
          </Route>
          <Route path="/hospitals/:handle">
            <Hospital />
          </Route>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path = "/404">
            <p>Error: Page not found</p>
          </Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
