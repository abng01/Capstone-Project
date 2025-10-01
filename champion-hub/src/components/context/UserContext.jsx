import React, { useState, useContext, useEffect, createContext, useMemo } from 'react'
import api from '../../library/api'

const UserContext = createContext()

export const UserProvider = (props) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const data = await api.get("/auth/me")
                setUser(data?.user ?? null)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const login = async (credentials) => {
        try {
            const { data } = await api.post("/auth/login", credentials);
            setUser(data.user)
            return data.user
        } catch (err) {
            throw err
        }
    }

    const logout = async () => {
        try {
            await api.post("/auth/logout")
            setUser(null)
        } catch (err) {
            console.error("Logout failed", err)
        }
    }

    const value = useMemo(() => ({
        user, 
        setUser, 
        isAuthenticated: !!user, 
        loading, 
        login, 
        logout,
    }), [user, loading, login, logout])

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)