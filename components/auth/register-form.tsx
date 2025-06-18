"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const success = await register(formData)
      if (success) {
        toast({
          title: "¡Registro exitoso!",
          description: "Tu cuenta ha sido creada correctamente.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al crear tu cuenta.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email">Correo electrónico</Label>
        <Input id="register-email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password">Contraseña</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Input id="address" name="address" value={formData.address} onChange={handleChange} />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Registrarse
      </Button>
    </form>
  )
}
