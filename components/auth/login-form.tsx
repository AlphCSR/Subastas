"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface LoginFormProps {
  onForgotPassword: () => void
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Credenciales incorrectas. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm">
            Mantener sesión iniciada
          </Label>
        </div>

        <Button type="button" variant="link" className="p-0 h-auto text-sm" onClick={onForgotPassword}>
          ¿Olvidaste tu contraseña?
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Iniciar Sesión
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        <p>Usuarios de prueba:</p>
        <p>admin@test.com | subastador@test.com | postor@test.com</p>
        <p>Contraseña: cualquiera</p>
      </div>
    </form>
  )
}
