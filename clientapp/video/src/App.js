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
import YourUpload from './pages/YourUpload';
import Watch from './pages/watch/Watch';
import Favorite from './pages/Favorite';
import Playlists from './pages/playlist/PlayLists';
import OpenPlayList from './pages/playlist/OpenPlayList';

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
            <>
            <Route path="/upload" element={<Upload />} />
            <Route path="/myuploads" element={<YourUpload />} />
            <Route path="/watch/:mediaId" element={<Watch />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/playlists/:id" element={<OpenPlayList />} />
            </>
          )}
      </Routes>
      </Router>
      </>
  );
}

export default App;
