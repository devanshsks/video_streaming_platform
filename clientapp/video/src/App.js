import React from 'react';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthContext } from './pages/authContext/AuthContext';
import './App.css';
import { useContext } from 'react';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element = {user ? <Home /> : <Login />} />
      </Routes>
      </Router>
  );
}

export default App;
