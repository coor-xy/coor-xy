import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { _setChartConfigs } from '../store/chartConfigs'
import { _setData } from '../store/data'
import { _setDataId } from '../store/dataId'
import { _clearAllValues, _removePrimaryColumn } from '../store/selectColumns'
import { Navbar, Container, Nav } from 'react-bootstrap'

const Nav_bar = () =>  {
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const dispatch = useDispatch()

  return (
    <div className="navbar-container">
      <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossOrigin="anonymous"
/>
      <Navbar bg="linear-gradient(90deg, rgba(55,58,64,1) 5%, rgba(104,109,118,1) 46%, rgba(91,126,135,1) 55%, rgba(70,153,162,1) 68%, rgba(238,238,238,1) 100%);">
    <Navbar.Brand href="/home">
        <img
          alt=""
          src="/logo.jpg"
          width="200"
          height="100"
          className="logo"
        />{' '}
        </Navbar.Brand>
    <Nav className="me-auto">
    {isLoggedIn ? (
          <div className="homepage-links">
            <Link to="/home">Home</Link>
            <Link to="/mycharts" onClick={()=>{
              dispatch(_setData([]));
              dispatch(_removePrimaryColumn(''))
              dispatch(_clearAllValues())
              dispatch(_setDataId(0))
            }}>My Charts</Link>
            <a href="#" className="logout" onClick={ () => dispatch(logout()) }>
              Logout
            </a>
          </div>
        ) : (
          <div className="homepage-links">
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
    </Nav>
  </Navbar>
    </div>
    )
}

export default Nav_bar
