import {useState} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  const [username, setUser] = useState('')
  const [password, setPass] = useState('')
  const [err, setErr] = useState('')

  const {history} = props

  const token = Cookies.get('jwt_token')

  const saveToken = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
    window.location.reload()
  }

  const sendData = async event => {
    console.log(event)
    event.preventDefault()
    const body = {username, password}
    const option = {
      method: 'post',
      body: JSON.stringify(body),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, option)
    const data = await response.json()

    if (response.ok) {
      saveToken(data.jwt_token)
    } else {
      setErr(data.error_msg)
    }
  }

  if (token !== undefined) {
    history.replace('/')
  }

  return (
    <div className='login-container'>
      <form className='form-container'>
        <label htmlFor='username' className='label-el'>
          USERNAME
        </label>
        <input
          type='text'
          value={username}
          id='username'
          className='input-el'
          onChange={event => setUser(event.target.value)}
          placeholder='Enter Username'
        />
        <label htmlFor='password' className='label-el'>
          PASSWORD
        </label>
        <input
          type='password'
          value={password}
          id='password'
          className='input-el'
          onChange={event => setPass(event.target.value)}
          placeholder='Enter Password'
        />
        <button type='submit' className='login-btn' onClick={sendData}>
          Login
        </button>
        <p>{err}</p>
      </form>
    </div>
  )
}

export default withRouter(Login)
