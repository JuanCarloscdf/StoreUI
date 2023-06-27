import user from '../assets/img/user.svg'
import market from '../assets/img/market.svg'
import order from '../assets/img/order.svg'
import cart from '../assets/img/cart.svg'
import animal from '../assets/img/animal.svg'
import search from '../assets/img/search.svg'
import money from '../assets/img/money.svg'
import leave from '../assets/img/leave.svg'
import { Login } from './login/Login'
import { Link } from 'react-router-dom'
import { Register } from './register/Register'
import './NavBar.css'
import { useState } from 'react'

export const NavBar = () => {
  const [open, setOpen] = useState(false)
  const [token, setToken] = useState(() => {
    const savedUser = window.localStorage.getItem('User')
    return savedUser ? JSON.parse(savedUser) : false
  })
  const [acount, setAcount] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  const closeSession = (event) => {
    window.localStorage.removeItem('User')
    setOpen(false)
    setToken(false)
  }
  return (
    <nav className='navBar_container'>
    <div className='navBar_logo'>
        <img className='navBar_logo_img' src={animal} alt='dev' />
        <h3 className='navBar_logo_title'>MARKET PLACE </h3>
    </div>

    <ul className='navBar_links'>
      <li className='navBar_link'><Link className='navBar_link' to='/'>HOME</Link></li>
      <li className='navBar_link'><Link className='navBar_link' to='/projects'>PROJECTS</Link></li>
      <li className='navBar_link'><Link className='navBar_link' to='/about'>ABOUT</Link></li>
    </ul>
    <div className='navBar_search'>
        <input type="text" className='search_input' />
        <img src={search} className='search_icon' alt="" />
    </div>

    <img onClick={handleClick} className='drop_down_icon' src={user} alt='user icon' />
    {
      open && (token
        ? (<div className='drop_down_container'>
          <ul className='drop_down'>
            <li className=' drop_down_link'><Link className='drop_down_navBar_link' to='/home'><span>Juan Carlos</span></Link></li>
            <li className=' drop_down_link'><Link className='drop_down_navBar_link' to='/market'><span>Market</span><img className='li_icon' src={market} alt='' /></Link></li>
            <li className=' drop_down_link'><Link className='drop_down_navBar_link' to='/about'><span>cart</span><img className='li_icon' src={cart} alt='' /></Link></li>
            <li className=' drop_down_link'><Link className='drop_down_navBar_link' to='/dasda'><span>orders</span><img className='li_icon' src={order} alt='' /></Link></li>
            <li className=' drop_down_link'><Link className='drop_down_navBar_link' to='/dasda'><span>bag</span><img className='li_icon' src={money} alt='' /></Link></li>
            <li className='drop_down_link leave'><Link onClick={closeSession} to='/'>log out <img className='li_icon' src={leave} alt=""/></Link></li>
          </ul>
        </div>)
        : acount ? (<Login setAcount={setAcount} setToken={setToken}></Login>) : (<Register setAcount={setAcount} setOpen={setOpen}></Register>)
      )
    }
  </nav>
  )
}
