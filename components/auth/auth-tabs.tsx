"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { ForgotPasswordForm } from "./forgot-password-form"

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Sistema de Subastas</CardTitle>
        <CardDescription>Accede a tu cuenta o regístrate para comenzar</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <LoginForm onForgotPassword={() => setActiveTab("forgot")} />
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <RegisterForm />
          </TabsContent>

          <TabsContent value="forgot" className="space-y-4">
            <ForgotPasswordForm onBackToLogin={() => setActiveTab("login")} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
