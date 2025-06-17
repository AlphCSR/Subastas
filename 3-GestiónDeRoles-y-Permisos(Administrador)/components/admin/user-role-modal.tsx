"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Role, User } from "@/lib/types"

interface UserRoleModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (userId: string, roleId: string) => void
  user: User | null
  roles: Role[]
}

export function UserRoleModal({ isOpen, onClose, onSave, user, roles }: UserRoleModalProps) {
  const [selectedRoleId, setSelectedRoleId] = useState("")

  useEffect(() => {
    if (user) {
      setSelectedRoleId(user.roleId)
    }
  }, [user])

  const handleSubmit = () => {
    if (user && selectedRoleId) {
      onSave(user.id, selectedRoleId)
    }
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Asignar Rol a {user.name}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup value={selectedRoleId} onValueChange={setSelectedRoleId}>
            {roles.map((role) => (
              <div key={role.id} className="flex items-center space-x-2 py-2">
                <RadioGroupItem value={role.id} id={`role-${role.id}`} />
                <Label htmlFor={`role-${role.id}`} className="font-medium">
                  {role.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
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
