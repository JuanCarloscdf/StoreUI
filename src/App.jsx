import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { NavBar } from './components/NavBar'
import { Market } from './pages/Market'
import { CheckAuth } from './components/CheckAuth'
import { SideBar } from './components/SideBar.jsx/SideBar'
import { Product } from './pages/Product'
import './App.css'

function App () {
  return (
    <div className="App">
      <NavBar className='navbar_container'></NavBar>
        <div className='main_container'>
          <SideBar></SideBar>
          <div className='routes_container'>
          <Routes>
            <Route index element={<Home/>}></Route>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/market' element={<CheckAuth><Market/></CheckAuth>}></Route>
            <Route path='/product' element={<Product/>}></Route>
            <Route path="/redirect" element={ <Navigate to="/" /> }/>
          </Routes>
          </div>
      </div>
    </div>
  )
}

export default App
