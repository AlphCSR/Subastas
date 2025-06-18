"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/providers/auth-provider"
import { useApi } from "@/hooks/use-api"
import { Camera, Save, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function ProfileView() {
  const { user, updateProfile } = useAuth()
  const { loading, executeRequest } = useApi()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  })

  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [photoUploading, setPhotoUploading] = useState(false)

  const handleSave = async () => {
    const result = await executeRequest(() => updateProfile(formData), "Perfil actualizado exitosamente")

    if (result) {
      setIsEditing(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedPhoto(e.target.files[0])
    }
  }

  const handlePhotoUpload = async () => {
    if (!selectedPhoto) return

    setPhotoUploading(true)

    const result = await executeRequest(async () => {
      const response = await fetch("/api/profile/photo", {
        method: "POST",
        body: (() => {
          const formData = new FormData()
          formData.append("photo", selectedPhoto)
          return formData
        })(),
      })

      if (!response.ok) {
        throw new Error("Failed to upload photo")
      }

      return response.json()
    }, "Foto de perfil actualizada exitosamente")

    if (result?.success) {
      updateProfile({ avatar: result.data.photoUrl })
      setShowPhotoModal(false)
      setSelectedPhoto(null)
    }

    setPhotoUploading(false)
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      executeRequest(
        () => Promise.reject(new Error("Las contraseñas no coinciden")),
        undefined,
        "Las contraseñas no coinciden",
      )
      return
    }

    if (passwordData.newPassword.length < 6) {
      executeRequest(
        () => Promise.reject(new Error("La contraseña debe tener al menos 6 caracteres")),
        undefined,
        "La contraseña debe tener al menos 6 caracteres",
      )
      return
    }

    const result = await executeRequest(async () => {
      const response = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to change password")
      }

      return response.json()
    }, "Contraseña actualizada exitosamente")

    if (result?.success) {
      setShowPasswordModal(false)
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
        <p className="text-gray-600">Gestiona tu información personal y configuración de cuenta</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Información Personal</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Actualiza tu información de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback className="text-lg">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" onClick={() => setShowPhotoModal(true)} disabled={loading}>
                  <Camera className="mr-2 h-4 w-4" />
                  Cambiar foto
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing || loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing || loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing || loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Input id="role" value={user?.role} disabled className="capitalize" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing || loading}
                />
              </div>

              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                      Guardar cambios
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} disabled={loading}>
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} disabled={loading}>
                    Editar perfil
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => setShowPasswordModal(true)} disabled={loading}>
                Cambiar contraseña
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Actividad</CardTitle>
              <CardDescription>Últimas acciones realizadas en tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Inicio de sesión", date: "2024-01-15 10:30", ip: "192.168.1.1" },
                  { action: "Puja realizada", date: "2024-01-14 15:45", ip: "192.168.1.1" },
                  { action: "Perfil actualizado", date: "2024-01-13 09:20", ip: "192.168.1.1" },
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">IP: {activity.ip}</p>
                    </div>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de cambio de foto */}
      <Dialog open={showPhotoModal} onOpenChange={setShowPhotoModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Foto de Perfil</DialogTitle>
            <DialogDescription>Selecciona una nueva foto para tu perfil</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={selectedPhoto ? URL.createObjectURL(selectedPhoto) : user?.avatar || "/placeholder.svg"}
                />
                <AvatarFallback className="text-2xl">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Seleccionar foto</Label>
              <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} disabled={photoUploading} />
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowPhotoModal(false)}
                className="flex-1"
                disabled={photoUploading}
              >
                Cancelar
              </Button>
              <Button onClick={handlePhotoUpload} disabled={!selectedPhoto || photoUploading} className="flex-1">
                {photoUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Actualizar Foto
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de cambio de contraseña */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Contraseña</DialogTitle>
            <DialogDescription>Ingresa tu contraseña actual y la nueva contraseña</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Contraseña actual</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva contraseña</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(false)}
                className="flex-1"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button onClick={handlePasswordChange} className="flex-1" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Cambiar Contraseña
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
