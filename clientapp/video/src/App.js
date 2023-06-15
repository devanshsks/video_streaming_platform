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
import { useContext, useState, createContext, useEffect } from 'react';
import Upload from './pages/upload/Upload';
import Navbar from './components/Navbar';
import YourUpload from './pages/YourUpload';
import Watch from './pages/watch/Watch';
import Favorite from './pages/Favorite';
import Playlists from './pages/playlist/PlayLists';
import OpenPlayList from './pages/playlist/OpenPlayList';
import Search from './pages/search/Search';
import SocketContext,{socket} from './socketContext/SocketContext';
import RoomContext from './roomContext/roomContext';
import { ChatProvider } from './chatContext/ChatContext';
import Room from './pages/room/Room';
import Roomnew from './pages/roomnew/RoomNew';



export const searchContext = createContext();

function App() {
  const { user } = useContext(AuthContext);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [roomState, setRoomState] = useState({
    roomId: null,
    roomName: null,
    isHost: false,
    isJoined: false,
  });
  const [StreamMedia, setStreamMedia] = useState({
    url:
      localStorage.getItem("streamMedia") !== null || undefined
        ? JSON.parse(localStorage.getItem("streamMedia")).url
        : null,
  });

  useEffect(() => {
    localStorage.setItem("streamMedia", JSON.stringify(StreamMedia));
  }, [StreamMedia]);

  return (
    <>
    <searchContext.Provider value={{ searchQuery, setSearchQuery }}>
    
    
    <Router>
    <SocketContext.Provider value={socket}>
    <ChatProvider>
    <RoomContext.Provider
              value={{ roomState, setRoomState, StreamMedia, setStreamMedia }}
            >
    <div>
    { user && (
      <Navbar />
    )}
    </div>
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
            <Route path="/search" element={<Search />} />
            <Route path="/room" element={<Roomnew />} />
            <Route path="/room/:roomId" element={<Room />} />
            </>
          )}
      </Routes>
      </RoomContext.Provider>
      </ChatProvider>
      </SocketContext.Provider>
      </Router>
      </searchContext.Provider>
      
      </>
  );
}

export default App;
