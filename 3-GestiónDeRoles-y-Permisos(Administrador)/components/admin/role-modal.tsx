"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { availablePermissions } from "@/lib/sample-data"
import type { Role } from "@/lib/types"

interface RoleModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (role: Role) => void
  role: Role | null
}

export function RoleModal({ isOpen, onClose, onSave, role }: RoleModalProps) {
  const [name, setName] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  useEffect(() => {
    if (role) {
      setName(role.name)
      setSelectedPermissions(role.permissions)
    } else {
      setName("")
      setSelectedPermissions([])
    }
  }, [role, isOpen])

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permission])
    } else {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permission))
    }
  }

  const handleSubmit = () => {
    if (!name.trim()) return

    const updatedRole: Role = {
      id: role?.id || "",
      name,
      permissions: selectedPermissions,
    }

    onSave(updatedRole)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{role ? "Editar Rol" : "Crear Nuevo Rol"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Rol</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingrese el nombre del rol"
            />
          </div>
          <div className="space-y-2">
            <Label>Permisos</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md">
              {availablePermissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={`permission-${permission}`}
                    checked={selectedPermissions.includes(permission)}
                    onCheckedChange={(checked) => handlePermissionChange(permission, checked === true)}
                  />
                  <Label htmlFor={`permission-${permission}`} className="text-sm">
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
