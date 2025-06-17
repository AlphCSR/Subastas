"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { RoleModal } from "./role-modal"
import { DeleteRoleDialog } from "./delete-role-dialog"
import { sampleRoles } from "@/lib/sample-data"
import type { Role } from "@/lib/types"

export function RolesManagement() {
  const [roles, setRoles] = useState<Role[]>(sampleRoles)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState<Role | null>(null)

  const handleCreateRole = () => {
    setCurrentRole(null)
    setIsModalOpen(true)
  }

  const handleEditRole = (role: Role) => {
    setCurrentRole(role)
    setIsModalOpen(true)
  }

  const handleDeleteRole = (role: Role) => {
    setCurrentRole(role)
    setIsDeleteDialogOpen(true)
  }

  const onSaveRole = (role: Role) => {
    if (currentRole) {
      // Edit existing role
      setRoles(roles.map((r) => (r.id === role.id ? role : r)))
    } else {
      // Create new role
      setRoles([...roles, { ...role, id: Date.now().toString() }])
    }
    setIsModalOpen(false)
  }

  const onDeleteRole = () => {
    if (currentRole) {
      setRoles(roles.filter((r) => r.id !== currentRole.id))
    }
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lista de Roles</h2>
        <Button onClick={handleCreateRole}>
          <Plus className="mr-2 h-4 w-4" /> Crear Rol
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{role.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Permisos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <Badge key={permission} variant="secondary">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditRole(role)}>
                    <Pencil className="h-4 w-4 mr-1" /> Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteRole(role)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <RoleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={onSaveRole} role={currentRole} />

      <DeleteRoleDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={onDeleteRole}
        roleName={currentRole?.name || ""}
      />
    </div>
  )
}
