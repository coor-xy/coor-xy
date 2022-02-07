import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { _setChartConfigs } from '../store/chartConfigs'
import { _setData } from '../store/data'
import { _clearAllValues, _removePrimaryColumn } from '../store/selectColumns'

const Navbar = () =>  {
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Coor|XY</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/home">Home</Link>
            <a href="#" onClick={ () => dispatch(logout()) }>
              Logout
            </a>
            <Link to="/mycharts" onClick={()=>{
              dispatch(_setData([]));
              dispatch(_removePrimaryColumn(''))
              dispatch(_clearAllValues())
            }}>My Charts</Link>
          </div>
        ) : (
          <div>
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