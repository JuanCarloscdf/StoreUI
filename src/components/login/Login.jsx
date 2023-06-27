import { Link } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import { useState } from 'react'

export const Login = ({ setAcount, setToken }) => {
  const [msg, setMsg] = useState("I'll help you")
  const userDataValidator = (newUser) => {
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email))) {
      setMsg('type a valid email please')
      return false
    }
    if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(newUser.password))) {
      setMsg('type a valid password please')
      return false
    }
    setMsg('Thanks for trusting us')
    return true
  }
  const handleToRegister = () => {
    setAcount(false)
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const newLogin = Object.fromEntries(new FormData(event.target))
      const isGoodData = userDataValidator(newLogin)
      if (!isGoodData) return
      const apiResponse = await axios.post('http://localhost:3200/login', newLogin)
      console.log(apiResponse.data)
      localStorage.setItem('User', JSON.stringify(apiResponse.data))
      setToken(true)
    } catch (error) {
      if (error.response.data.message === 'email_error') {
        setMsg('please check your data')
      }
      if (error.response.data.message === 'password_error') {
        setMsg('please check your data')
      }
    }
  }
  return (
        <form className="login_container" onSubmit={handleSubmit}>
            <h3 className="login_title">Login</h3>
            <label htmlFor="email">email</label>
            <input className='login_input' name="email" id="email" type="text" />
            <label htmlFor="password">password</label>
            <input className='login_input' name="password" id="password" type="password" />
            <button className='login_button'>start</button>
            <p className='login_msg'>{msg}</p>
            <Link className='login_link'>forgot your password?</Link>
            <a className='login_link create' onClick={handleToRegister}>create acount</a>

        </form>
  )
}
