"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Wallet, Building2, Plus, Edit, Trash2, Star } from "lucide-react"

interface PaymentMethod {
  id: string
  type: "card" | "bank" | "wallet"
  name: string
  details: string
  isDefault: boolean
  status: "active" | "expired" | "blocked"
  addedDate: string
}

export function PaymentMethodsView() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa **** 4532",
      details: "Expira 12/25",
      isDefault: true,
      status: "active",
      addedDate: "2024-01-10",
    },
    {
      id: "2",
      type: "card",
      name: "Mastercard **** 8901",
      details: "Expira 08/26",
      isDefault: false,
      status: "active",
      addedDate: "2024-01-05",
    },
    {
      id: "3",
      type: "bank",
      name: "Cuenta Bancaria",
      details: "Banco Nacional - **** 8901",
      isDefault: false,
      status: "active",
      addedDate: "2024-01-01",
    },
    {
      id: "4",
      type: "wallet",
      name: "PayPal",
      details: "usuario@email.com",
      isDefault: false,
      status: "active",
      addedDate: "2023-12-20",
    },
  ])

  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newMethodData, setNewMethodData] = useState({
    type: "card",
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const { toast } = useToast()

  const [showEditModal, setShowEditModal] = useState<PaymentMethod | null>(null)
  const [editData, setEditData] = useState({
    name: "",
    details: "",
  })

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-5 w-5" />
      case "bank":
        return <Building2 className="h-5 w-5" />
      case "wallet":
        return <Wallet className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expirado</Badge>
      case "blocked":
        return <Badge className="bg-gray-100 text-gray-800">Bloqueado</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )

    toast({
      title: "Método predeterminado actualizado",
      description: "El método de pago ha sido establecido como predeterminado.",
    })
  }

  const handleDelete = (id: string) => {
    setPaymentMethods((methods) => methods.filter((method) => method.id !== id))

    toast({
      title: "Método eliminado",
      description: "El método de pago ha sido eliminado exitosamente.",
    })
  }

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault()

    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: newMethodData.type as "card" | "bank" | "wallet",
      name: `**** ${newMethodData.number.slice(-4)}`,
      details: `Expira ${newMethodData.expiry}`,
      isDefault: false,
      status: "active",
      addedDate: new Date().toISOString().split("T")[0],
    }

    setPaymentMethods([...paymentMethods, newMethod])
    setNewMethodData({ type: "card", number: "", expiry: "", cvv: "", name: "" })
    setIsAddingNew(false)

    toast({
      title: "Método agregado",
      description: "El nuevo método de pago ha sido agregado exitosamente.",
    })
  }

  const handleEditMethod = (method: PaymentMethod) => {
    setShowEditModal(method)
    setEditData({
      name: method.name,
      details: method.details,
    })
  }

  const handleSaveEdit = () => {
    if (!showEditModal) return

    setPaymentMethods((methods) =>
      methods.map((method) =>
        method.id === showEditModal.id ? { ...method, name: editData.name, details: editData.details } : method,
      ),
    )

    setShowEditModal(null)
    toast({
      title: "Método actualizado",
      description: "El método de pago ha sido actualizado exitosamente.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Métodos de Pago</h1>
          <p className="text-gray-600">Gestiona tus métodos de pago guardados</p>
        </div>

        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Método
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Agregar Método de Pago</DialogTitle>
              <DialogDescription>Agrega un nuevo método de pago a tu cuenta</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddNew} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número de tarjeta</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newMethodData.number}
                  onChange={(e) => setNewMethodData({ ...newMethodData, number: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiración</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/AA"
                    value={newMethodData.expiry}
                    onChange={(e) => setNewMethodData({ ...newMethodData, expiry: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={newMethodData.cvv}
                    onChange={(e) => setNewMethodData({ ...newMethodData, cvv: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                <Input
                  id="cardName"
                  placeholder="Juan Pérez"
                  value={newMethodData.name}
                  onChange={(e) => setNewMethodData({ ...newMethodData, name: e.target.value })}
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddingNew(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Agregar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getPaymentIcon(method.type)}
                  <div>
                    <CardTitle className="text-lg">{method.name}</CardTitle>
                    <CardDescription>{method.details}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {method.isDefault && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Badge variant="outline">Predeterminado</Badge>
                    </div>
                  )}
                  {getStatusBadge(method.status)}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">Agregado el {new Date(method.addedDate).toLocaleDateString()}</div>

              <div className="flex space-x-2">
                {!method.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                    <Star className="mr-2 h-4 w-4" />
                    Predeterminado
                  </Button>
                )}

                <Button variant="outline" size="sm" onClick={() => handleEditMethod(method)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(method.id)}
                  disabled={method.isDefault}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {paymentMethods.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No tienes métodos de pago</h3>
            <p className="text-gray-600 mb-4">Agrega un método de pago para participar en subastas</p>
            <Button onClick={() => setIsAddingNew(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Primer Método
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal de editar método */}
      {showEditModal && (
        <Dialog open={!!showEditModal} onOpenChange={() => setShowEditModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Método de Pago</DialogTitle>
              <DialogDescription>Modifica los detalles del método de pago</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editName">Nombre</Label>
                <Input
                  id="editName"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editDetails">Detalles</Label>
                <Input
                  id="editDetails"
                  value={editData.details}
                  onChange={(e) => setEditData({ ...editData, details: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowEditModal(null)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleSaveEdit} className="flex-1">
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
