import { Navigate } from 'react-router-dom'
export const CheckAuth = ({ children }) => {
  const user = window.localStorage.getItem('User')
  console.log('navigate', user)
  if (!user) {
    return <Navigate to='/'/>
  }
  return children
}
