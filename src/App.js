import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import ProceduresList from './components/ProceduresList';
import HospitalsList from './components/HospitalsList';
import Procedure from './components/Procedure';
import Hospital from './components/Hospital';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <Routes>
          <Route exact path="/procedures" element={<ProceduresList />} />
          <Route path="/procedures/:code" element={<Procedure />} />
          <Route exact path="/hospitals" element={<HospitalsList />} />
          <Route path="/hospitals/:handle" element={<Hospital />} />
          <Route exact path="/" element={<Welcome />} />
          <Route path = "/404" element={<p>Error: Page not found</p>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
