import React from 'react';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthContext } from './authContext/AuthContext';
import './App.css';
import { useContext } from 'react';
import Upload from './pages/upload/Upload';
import Navbar from './components/Navbar';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
    <div>
    { user && (
      <Navbar />
    )}
    </div>
    <Router>
      <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element = {user ? <Home /> : <Login />} />
          {user && (
            <Route path="/upload" element={<Upload />} />
          )}
      </Routes>
      </Router>
      </>
  );
}

export default App;
