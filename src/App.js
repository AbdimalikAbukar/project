import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import Scoreboard from './Scoreboard';
import Register from './Register'; 
import Login from './Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

