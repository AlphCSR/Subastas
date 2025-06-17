import type React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container py-10 mx-auto px-5">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Perfil de Usuario</h1>
          <p className="text-muted-foreground">Administra tu información personal y preferencias</p>
        </div>
        <Separator />
        <Tabs defaultValue="perfil" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger className="rounded" value="perfil" asChild>
              <a href="/perfil">Perfil</a>
            </TabsTrigger>
            <TabsTrigger value="contrasena" asChild>
              <a href="/perfil/contrasena">Contraseña</a>
            </TabsTrigger>
            <TabsTrigger value="actividad" asChild>
              <a href="/perfil/actividad">Historial de Actividad</a>
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">{children}</div>
        </Tabs>
      </div>
    </div>
  )
}
