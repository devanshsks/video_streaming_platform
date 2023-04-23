import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../authContext/AuthContext'
import { logout } from '../authContext/AuthActions'

const Navbar = () => {
    const {dispatch} = useContext(AuthContext);
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
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar