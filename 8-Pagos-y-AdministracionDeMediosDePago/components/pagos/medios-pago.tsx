"use client"

import { useState } from "react"
import { CreditCard, Building, Wallet, Plus, Trash2, Check, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockPaymentMethods } from "@/lib/mock-data"

export default function MediosPago() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods)
  const [isAddingMethod, setIsAddingMethod] = useState(false)
  const [newMethodType, setNewMethodType] = useState("tarjeta")

  const handleAddMethod = () => {
    const newMethod = {
      id: `pm-${Date.now()}`,
      type: newMethodType,
      name:
        newMethodType === "tarjeta"
          ? "•••• 1234"
          : newMethodType === "banco"
            ? "Cuenta **** 5678"
            : "Billetera Digital",
      dateAdded: new Date().toISOString(),
      isDefault: paymentMethods.length === 0,
    }

    setPaymentMethods([...paymentMethods, newMethod])
    setIsAddingMethod(false)
  }

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const getMethodIcon = (type: string) => {
    switch (type) {
      case "tarjeta":
        return <CreditCard className="h-4 w-4" />
      case "banco":
        return <Building className="h-4 w-4" />
      case "billetera":
        return <Wallet className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Mis Medios de Pago</CardTitle>
          <CardDescription>Administra tus métodos de pago</CardDescription>
        </div>
        <Dialog open={isAddingMethod} onOpenChange={setIsAddingMethod}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar método
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar método de pago</DialogTitle>
              <DialogDescription>Ingresa los datos de tu nuevo método de pago</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo de método</Label>
                <Select value={newMethodType} onValueChange={setNewMethodType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tarjeta">Tarjeta de crédito/débito</SelectItem>
                    <SelectItem value="banco">Cuenta bancaria</SelectItem>
                    <SelectItem value="billetera">Billetera digital</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newMethodType === "tarjeta" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="cardNumber">Número de tarjeta</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Fecha de expiración</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </>
              )}

              {newMethodType === "banco" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="accountNumber">Número de cuenta</Label>
                    <Input id="accountNumber" placeholder="123456789" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bankName">Nombre del banco</Label>
                    <Input id="bankName" placeholder="Banco Nacional" />
                  </div>
                </>
              )}

              {newMethodType === "billetera" && (
                <div className="grid gap-2">
                  <Label htmlFor="walletEmail">Correo electrónico</Label>
                  <Input id="walletEmail" placeholder="usuario@ejemplo.com" type="email" />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingMethod(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddMethod}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {paymentMethods.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No tienes métodos de pago registrados</div>
        ) : (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  {getMethodIcon(method.type)}
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {method.name}
                      {method.isDefault && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Predeterminado
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Registrado el {new Date(method.dateAdded).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                      <Check className="h-4 w-4 mr-1" />
                      Predeterminado
                    </Button>
                  )}
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteMethod(method.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
