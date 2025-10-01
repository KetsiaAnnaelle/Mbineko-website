"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { authAPI } from "../services/api"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  organization?: string
  role: string
  hasKit?: boolean
  kitDetails?: {
    sensorBoxNumber?: string
    droneNumber?: string
  }
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  register: (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    organization?: string
  }) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuth = async () => {
      try {
        const currentUser = await authAPI.getCurrentUser()
        if (currentUser && (await authAPI.isAuthenticated())) {
          setUser(currentUser)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        await authAPI.logout()
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await authAPI.login(credentials)
      setUser(response.user)
    } catch (error) {
      throw error
    }
  }

  const register = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    organization?: string
  }) => {
    try {
      const response = await authAPI.register(userData)
      setUser(response.user)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    authAPI.logout()
    setUser(null)
  }

  const refreshToken = async () => {
    try {
      await authAPI.refreshToken()
    } catch (error) {
      logout()
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
