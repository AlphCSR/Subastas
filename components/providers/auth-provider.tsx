"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "subastador" | "postor"
  avatar?: string
  phone?: string
  address?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Simular carga de usuario desde localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de login
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      name: "Usuario Demo",
      email,
      role: email.includes("admin") ? "admin" : email.includes("subastador") ? "subastador" : "postor",
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return true
  }

  const register = async (userData: any): Promise<boolean> => {
    // Simulación de registro
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      role: "postor" as const,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
