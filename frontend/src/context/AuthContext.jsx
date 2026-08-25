import { useState } from 'react'
import { authApi } from '../api/auth.js'
import { AuthContext } from './authContext.js'

const STORAGE_KEY = 'nana-xinh-auth'

function readStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession)
  const [isLoading, setIsLoading] = useState(false)

  async function login(credentials) {
    setIsLoading(true)

    try {
      const nextSession = await authApi.login(credentials)
      setSession(nextSession)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))
      return nextSession
    } finally {
      setIsLoading(false)
    }
  }

  function logout() {
    if (session?.token) {
      authApi.logout(session.token).catch(() => {})
    }

    setSession(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  async function forgotPassword(email) {
    setIsLoading(true)

    try {
      return await authApi.forgotPassword(email)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    isAuthenticated: Boolean(session?.user),
    isLoading,
    login,
    logout,
    forgotPassword,
    role: session?.user?.role || null,
    token: session?.token || null,
    user: session?.user || null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
