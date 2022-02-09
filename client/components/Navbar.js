import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { _setChartConfigs } from '../store/chartConfigs'
import { _setData } from '../store/data'
import { _setDataId } from '../store/dataId'
import { _clearAllValues, _removePrimaryColumn } from '../store/selectColumns'

const Navbar = () =>  {
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const dispatch = useDispatch()

  return (
    <div className="navbar-container">
      <img src="/logo.jpg" alt='logo' className="logo" />
      <nav>
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
      </nav>
      <hr />
    </div>
    )
}

export default Navbar
