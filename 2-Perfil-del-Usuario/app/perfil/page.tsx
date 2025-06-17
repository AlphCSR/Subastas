"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    nombre: "Carlos Rodríguez",
    email: "carlos.rodriguez@ejemplo.com",
    telefono: "+34 612 345 678",
    direccion: "Calle Principal 123, 28001 Madrid, España",
    biografia: "Coleccionista apasionado con más de 10 años de experiencia en subastas de arte y antigüedades.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Perfil actualizado",
      description: "Tus cambios han sido guardados correctamente.",
    })
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-8">
          <div className="flex flex-col items-center sm:flex-row sm:gap-8">
            <div className="mb-4 sm:mb-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.nombre} />
                <AvatarFallback>
                  {userData.nombre
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="mt-2">
                  <Label htmlFor="photo" className="text-sm">
                    Cambiar foto
                  </Label>
                  <Input id="photo" type="file" className="mt-1" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={userData.nombre}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    value={userData.telefono}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Textarea
                  id="direccion"
                  name="direccion"
                  value={userData.direccion}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="biografia">Biografía</Label>
                <Textarea
                  id="biografia"
                  name="biografia"
                  value={userData.biografia}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Editar</Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>Guardar cambios</Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
