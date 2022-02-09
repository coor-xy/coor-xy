import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const formName = evt.target.name
    const username = evt.target.username.value
    const password = evt.target.password.value
    let email;
    if (displayName==="Sign Up"){
      email = evt.target.email.value
    } else {
      email = ""
    }
    dispatch(authenticate(username, password, formName, email))
  }

  const myStyle={
    "marginTop":"35px",
    "display": "flex",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "flexDirection": "column",
    "borderRadius": "25px",
    "width":"23%",
    "backgroundColor":"#373A40",
    "color":"white",
}

  return (
    <div style={{"display": "flex",
      "alignItems": "center",
      "flexFlow": "column wrap",
      "justifyContent": "flex-start",}}>
      <form style={myStyle} onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
          {displayName === 'Sign Up' ?
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="email" />
          </div>: <></>
          }
        <div>
          <button style={{
            "padding": "1.05em",
            "background": "#19D3DA",
            "color": "black",
            "border": "none",
            "borderRadius": "25px",
            "fontWeight": "600",
            "cursor": "pointer",
            }} type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

export const Login = <AuthForm name="login" displayName="Login" />
export const Signup = <AuthForm name="signup" displayName="Sign Up" />