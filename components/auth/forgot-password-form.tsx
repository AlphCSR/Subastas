"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2 } from "lucide-react"

interface ForgotPasswordFormProps {
  onBackToLogin: () => void
}

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular envío de email
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setEmailSent(true)
    setIsLoading(false)

    toast({
      title: "Email enviado",
      description: "Revisa tu correo para restablecer tu contraseña.",
    })
  }

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="text-green-600 text-lg font-semibold">✓ Email enviado</div>
        <p className="text-sm text-muted-foreground">
          Hemos enviado un enlace de recuperación a <strong>{email}</strong>
        </p>
        <p className="text-xs text-muted-foreground">El enlace expirará en 24 horas</p>
        <Button onClick={onBackToLogin} variant="outline" className="w-full">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio de sesión
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button type="button" variant="ghost" onClick={onBackToLogin} className="p-0 h-auto">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al inicio de sesión
      </Button>

      <div className="space-y-2">
        <Label htmlFor="forgot-email">Correo electrónico</Label>
        <Input
          id="forgot-email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Enviar enlace de recuperación
      </Button>
    </form>
  )
}
