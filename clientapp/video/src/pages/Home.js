import React, { useContext } from 'react'
import { AuthContext } from '../authContext/AuthContext'
import { logout } from '../authContext/AuthActions'


const Home = () => {
  const {dispatch} = useContext(AuthContext);
  const handleClick = () =>{
    dispatch(logout());
  }
  return (
    <>
    <div>This is home</div>
    <div className='button' style={{"text-align":"center", "maxWidth":"100px"}} onClick={handleClick}>LOGOUT</div>
    </>
  )
}

export default Home