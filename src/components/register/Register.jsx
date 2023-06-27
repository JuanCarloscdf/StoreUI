import axios from 'axios'
import { useState } from 'react'
import './register.css'
export const Register = ({ setAcount, setOpen }) => {
  console.log(setAcount)
  const [msg, setMsg] = useState('Thanks for trusting us')
  const userDataValidator = (newUser) => {
    if (!(/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s']{2,30}[a-zA-ZáéíóúñÑÁÉÍÓÚ]$/.test(newUser.first_name))) {
      setMsg('type a valid first name please')
      return false
    }
    if (!(/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s']{2,30}$/.test(newUser.last_name))) {
      setMsg('type a valid last name please')
      return false
    }
    if (!(/^\d{7,12}$/.test(newUser.cellphone))) {
      setMsg('type a valid cellphone please')
      return false
    }
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
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const newUser = Object.fromEntries(new window.FormData(event.target))
      const isCorrect = userDataValidator(newUser)
      newUser.user_type_id = 4
      if (!isCorrect) return
      const apiResponse = await axios.post('http://localhost:3200/user', newUser)
      console.log('apiResponse 1:>> ', apiResponse.data)

      if (apiResponse.data.message === 'user created') {
        console.log('dasddfsdfsdfsdf')
        setAcount(true)
      }
    } catch (error) {
      console.log('register error', error.response.data.message)
      if (error.response.data.message === 'email_error') {
        setMsg('email already registered')
      }
      if (error.response.data.message === 'cellphone_error') {
        setMsg('cellphone already registered')
      }
    }
  }
  const handleLogin = (params) => {
    setAcount(true)
  }
  return (

        <form className="login_container" onSubmit={handleSubmit} id='store_register'>
        <h3 className="login_title">Register</h3>

        <label htmlFor="first_name">First Name</label>
        <input className='login_input' name="first_name" id="first_name" type="text" />

        <label htmlFor="last_name">last_name</label>
        <input className='login_input' name="last_name" id="last_name" type="text" />

        <label htmlFor="cellphone">cellphone</label>
        <input className='login_input' name="cellphone" id="cellphone" type="text" />

        <label htmlFor="email">email</label>
        <input className='login_input' name="email" id="email" type="email" />

        <label htmlFor="password">password</label>
        <input className='login_input' name="password" id="password" type="password" />

        <button className='login_button'>create</button>
        <p className='login_msg'>{msg}</p>
        <a href="#" className='send_to_login' onClick={handleLogin}>login</a>
        </form>

  )
}
