import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../authContext/AuthContext'
import { logout } from '../authContext/AuthActions'
import { searchContext } from '../App'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const {dispatch} = useContext(AuthContext);
    const search = useContext(searchContext);
    // console.log(search.searchQuery)
    const navigate = useNavigate();
    const handleSearch = (e) => {
      e.preventDefault();
      if (search.searchQuery) {
        navigate(`/search?query=${encodeURIComponent(search.searchQuery)}`);
      }
    };
  const handleClick = () =>{
    dispatch(logout());
    window.location.replace("/");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">HOME</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <button className="nav-link" onClick={handleClick}>Logout</button>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/upload">Upload</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/myuploads">My Uploads</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/favorites">Favorites</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/playlists">Playlists</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/room">Rooms</a>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          id="navbar-search"
          style={{ width: "300px" }}
          value={search.searchQuery}
          onChange={(e) => search.setSearchQuery(e.target.value)}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={handleSearch}
        >
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar