"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Shield, Users, Package, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useApi } from "@/hooks/use-api"

export function RolesView() {
  const { loading, executeRequest } = useApi()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState<any>(null)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const [roles, setRoles] = useState([
    {
      id: "1",
      name: "Administrador",
      description: "Acceso completo al sistema",
      permissions: ["Gestionar usuarios", "Gestionar roles", "Ver reportes", "Configurar sistema"],
      userCount: 2,
      color: "red",
    },
    {
      id: "2",
      name: "Subastador",
      description: "Puede crear y gestionar subastas",
      permissions: ["Crear subastas", "Gestionar productos", "Ver estadísticas"],
      userCount: 5,
      color: "blue",
    },
    {
      id: "3",
      name: "Postor",
      description: "Puede participar en subastas",
      permissions: ["Participar en subastas", "Ver historial", "Gestionar perfil"],
      userCount: 150,
      color: "green",
    },
  ])

  const getIcon = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case "administrador":
        return <Shield className="h-5 w-5" />
      case "subastador":
        return <Package className="h-5 w-5" />
      case "postor":
        return <Users className="h-5 w-5" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  const handleCreateRole = async () => {
    if (!newRole.name || !newRole.description) {
      executeRequest(
        () => Promise.reject(new Error("Nombre y descripción son requeridos")),
        undefined,
        "Nombre y descripción son requeridos",
      )
      return
    }

    const result = await executeRequest(async () => {
      const response = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRole),
      })

      if (!response.ok) {
        throw new Error("Failed to create role")
      }

      return response.json()
    }, "Rol creado exitosamente")

    if (result?.success) {
      const role = {
        ...result.data,
        userCount: 0,
        color: "blue",
      }

      setRoles([...roles, role])
      setNewRole({ name: "", description: "", permissions: [] })
      setShowCreateModal(false)
    }
  }

  const handleEditRole = async (updatedRole: any) => {
    const result = await executeRequest(async () => {
      const response = await fetch(`/api/roles/${updatedRole.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRole),
      })

      if (!response.ok) {
        throw new Error("Failed to update role")
      }

      return response.json()
    }, "Rol actualizado exitosamente")

    if (result?.success) {
      setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)))
      setShowEditModal(null)
    }
  }

  const handleDeleteRole = async (roleId: string) => {
    const role = roles.find((r) => r.id === roleId)
    if (role && role.userCount > 0) {
      executeRequest(
        () => Promise.reject(new Error("No se puede eliminar un rol que tiene usuarios asignados")),
        undefined,
        "No se puede eliminar un rol que tiene usuarios asignados",
      )
      return
    }

    const result = await executeRequest(async () => {
      const response = await fetch(`/api/roles/${roleId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete role")
      }

      return response.json()
    }, "Rol eliminado exitosamente")

    if (result?.success) {
      setRoles(roles.filter((r) => r.id !== roleId))
    }
  }

  const handleAssignRoles = async () => {
    const assignments = selectedUsers.map((userId) => ({
      userId,
      roleId: "postor", // Ejemplo, en una app real esto vendría de un selector
    }))

    const result = await executeRequest(async () => {
      const response = await fetch("/api/roles/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignments }),
      })

      if (!response.ok) {
        throw new Error("Failed to assign roles")
      }

      return response.json()
    }, `Se han actualizado las asignaciones para ${selectedUsers.length} usuarios`)

    if (result?.success) {
      setShowAssignModal(false)
      setSelectedUsers([])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Roles</h1>
          <p className="text-gray-600">Administra los roles y permisos del sistema</p>
        </div>

        <Button onClick={() => setShowCreateModal(true)} disabled={loading}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Rol
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getIcon(role.name)}
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                </div>
                <Badge variant="secondary">{role.userCount} usuarios</Badge>
              </div>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Permisos:</h4>
                <div className="space-y-1">
                  {role.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setShowEditModal(role)}
                  disabled={loading}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteRole(role.id)}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asignación de Roles</CardTitle>
          <CardDescription>Asigna roles a múltiples usuarios</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShowAssignModal(true)} disabled={loading}>
            <Users className="mr-2 h-4 w-4" />
            Asignar Roles en Lote
          </Button>
        </CardContent>
      </Card>

      {/* Modal Crear Rol */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Rol</DialogTitle>
            <DialogDescription>Define un nuevo rol con sus permisos correspondientes</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Nombre del rol</Label>
              <Input
                id="roleName"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                placeholder="Ej: Moderador"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roleDescription">Descripción</Label>
              <Textarea
                id="roleDescription"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                placeholder="Describe las responsabilidades del rol..."
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label>Permisos</Label>
              <div className="space-y-2">
                {[
                  "Gestionar usuarios",
                  "Crear subastas",
                  "Gestionar productos",
                  "Ver reportes",
                  "Configurar sistema",
                  "Moderar contenido",
                ].map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission}
                      checked={newRole.permissions.includes(permission)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewRole({
                            ...newRole,
                            permissions: [...newRole.permissions, permission],
                          })
                        } else {
                          setNewRole({
                            ...newRole,
                            permissions: newRole.permissions.filter((p) => p !== permission),
                          })
                        }
                      }}
                      disabled={loading}
                    />
                    <Label htmlFor={permission} className="text-sm">
                      {permission}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1" disabled={loading}>
                Cancelar
              </Button>
              <Button onClick={handleCreateRole} className="flex-1" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Crear Rol
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Rol */}
      {showEditModal && (
        <Dialog open={!!showEditModal} onOpenChange={() => setShowEditModal(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Rol</DialogTitle>
              <DialogDescription>Modifica los detalles y permisos del rol</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editRoleName">Nombre del rol</Label>
                <Input
                  id="editRoleName"
                  value={showEditModal.name}
                  onChange={(e) => setShowEditModal({ ...showEditModal, name: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editRoleDescription">Descripción</Label>
                <Textarea
                  id="editRoleDescription"
                  value={showEditModal.description}
                  onChange={(e) => setShowEditModal({ ...showEditModal, description: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label>Permisos</Label>
                <div className="space-y-2">
                  {[
                    "Gestionar usuarios",
                    "Crear subastas",
                    "Gestionar productos",
                    "Ver reportes",
                    "Configurar sistema",
                    "Moderar contenido",
                  ].map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-${permission}`}
                        checked={showEditModal.permissions.includes(permission)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setShowEditModal({
                              ...showEditModal,
                              permissions: [...showEditModal.permissions, permission],
                            })
                          } else {
                            setShowEditModal({
                              ...showEditModal,
                              permissions: showEditModal.permissions.filter((p: string) => p !== permission),
                            })
                          }
                        }}
                        disabled={loading}
                      />
                      <Label htmlFor={`edit-${permission}`} className="text-sm">
                        {permission}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowEditModal(null)} className="flex-1" disabled={loading}>
                  Cancelar
                </Button>
                <Button onClick={() => handleEditRole(showEditModal)} className="flex-1" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal Asignar Roles */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Asignar Roles en Lote</DialogTitle>
            <DialogDescription>Selecciona usuarios y asigna roles</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Usuarios disponibles</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {[
                  { id: "1", name: "Juan Pérez", email: "juan@example.com" },
                  { id: "2", name: "María García", email: "maria@example.com" },
                  { id: "3", name: "Carlos López", email: "carlos@example.com" },
                ].map((user) => (
                  <div key={user.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedUsers([...selectedUsers, user.id])
                        } else {
                          setSelectedUsers(selectedUsers.filter((id) => id !== user.id))
                        }
                      }}
                      disabled={loading}
                    />
                    <Label htmlFor={`user-${user.id}`} className="text-sm">
                      {user.name} ({user.email})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignRole">Rol a asignar</Label>
              <Select disabled={loading}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowAssignModal(false)} className="flex-1" disabled={loading}>
                Cancelar
              </Button>
              <Button onClick={handleAssignRoles} className="flex-1" disabled={selectedUsers.length === 0 || loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Asignar Roles
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
