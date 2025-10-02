// UserContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import axios from 'axios'
import { getUser } from '../../api'
import {useCookies} from 'react-cookie'

const UserContext = createContext()

const minus = "http://localhost:3000/auth"

export const UserProvider = ({ children }) => {
  // Using the react-cookie hook to manage the user cookie
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [user, setUser] = useState(cookies.userObject ? cookies.userObject : {})
  const [loading, setLoading] = useState(true)
  const [isLaunched, setIsLaunched] = useState(false)
  let signedIn = false

  // Function to handle user object and set cookie
  const handleUser = (user) => {
      console.log(user)
      if (user.id) {
        // Setting user cookie for 24 hours
        setCookie('userObject', JSON.stringify(user.user), { path: '/', maxAge: 60 * 60 * 24 * 28 }) 
      } else {
        // If user does not have an id, remove user cookie
        removeCookie('userObject')
      }
  }

  // Login function
  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.post(minus + '/login', { username, password }, { withCredentials: true })
      console.log(response.data)
      if (response.data.user_id) {
        // fetch full user info after login
        const fullUser = await getUser(response.data.user_id)
        console.log(fullUser.data.id)
        setUser(fullUser.data)
        sessionStorage.setItem('user', JSON.stringify(fullUser.data))
        setIsLaunched(true)
        signedIn = true
        // handleUser(fullUser)
        return { success: true }
      }

      return { success: false, message: 'Login failed' }
    } catch (err) {
      console.error('Login error:', err)
      const message = err.response?.data?.message || 'Server error'
      return { success: false, message }
    }
  }, [])

  // Logout function
  const logout = useCallback(() => {
    setUser(null)
    sessionStorage.removeItem('user')
    setIsLaunched(false)
    signedIn = false
  }, [])

  // On mount, restore session
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'))
    if (!signedIn) {
      console.log("do nothing")
    } else if (storedUser) {
      setUser(storedUser)
    }
    setLoading(false)
  }, [])

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    isLaunched,
    setIsLaunched
  }), [user, loading, login, logout, isLaunched, setIsLaunched])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
