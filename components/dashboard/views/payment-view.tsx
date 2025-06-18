"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Wallet, Building2, Shield, CheckCircle } from "lucide-react"

interface PaymentMethod {
  id: string
  type: "card" | "bank" | "wallet"
  name: string
  details: string
  isDefault: boolean
  status: "active" | "expired" | "blocked"
}

export function PaymentView() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa **** 4532",
      details: "Expira 12/25",
      isDefault: true,
      status: "active",
    },
    {
      id: "2",
      type: "bank",
      name: "Cuenta Bancaria",
      details: "Banco Nacional - **** 8901",
      isDefault: false,
      status: "active",
    },
    {
      id: "3",
      type: "wallet",
      name: "PayPal",
      details: "usuario@email.com",
      isDefault: false,
      status: "active",
    },
  ])

  const [selectedPayment, setSelectedPayment] = useState<string>("")
  const [newCardData, setNewCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const { toast } = useToast()

  const auctionToPay = {
    id: "1",
    title: "Reloj Vintage Omega Seamaster",
    finalPrice: 1250,
    fees: 62.5, // 5% de comisión
    shipping: 25,
    total: 1337.5,
    image: "/placeholder.svg?height=150&width=200",
  }

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

  const handlePayment = () => {
    if (!selectedPayment) {
      toast({
        title: "Error",
        description: "Selecciona un método de pago.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "¡Pago procesado!",
      description: "Tu pago ha sido procesado exitosamente.",
    })
  }

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()

    const newCard: PaymentMethod = {
      id: Date.now().toString(),
      type: "card",
      name: `**** ${newCardData.number.slice(-4)}`,
      details: `Expira ${newCardData.expiry}`,
      isDefault: false,
      status: "active",
    }

    setPaymentMethods([...paymentMethods, newCard])
    setNewCardData({ number: "", expiry: "", cvv: "", name: "" })

    toast({
      title: "Tarjeta agregada",
      description: "Tu nueva tarjeta ha sido agregada exitosamente.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pago de Subasta</h1>
        <p className="text-gray-600">Completa el pago de tu subasta ganada</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumen del pedido */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen del Pedido</CardTitle>
            <CardDescription>Detalles de tu subasta ganada</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={auctionToPay.image || "/placeholder.svg"}
                alt={auctionToPay.title}
                className="w-20 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{auctionToPay.title}</h3>
                <p className="text-sm text-gray-600">Subasta ganada</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Precio de subasta</span>
                <span>${auctionToPay.finalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Comisión de plataforma (5%)</span>
                <span>${auctionToPay.fees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>${auctionToPay.shipping.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${auctionToPay.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Pago seguro protegido por SSL</span>
            </div>
          </CardContent>
        </Card>

        {/* Métodos de pago */}
        <Card>
          <CardHeader>
            <CardTitle>Método de Pago</CardTitle>
            <CardDescription>Selecciona cómo deseas pagar</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="existing" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="existing">Métodos Guardados</TabsTrigger>
                <TabsTrigger value="new">Nuevo Método</TabsTrigger>
              </TabsList>

              <TabsContent value="existing" className="space-y-4">
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getPaymentIcon(method.type)}
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-gray-600">{method.details}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {method.isDefault && <Badge variant="outline">Predeterminado</Badge>}
                          {getStatusBadge(method.status)}
                          {selectedPayment === method.id && <CheckCircle className="h-5 w-5 text-blue-600" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={handlePayment} className="w-full" size="lg" disabled={!selectedPayment}>
                  Pagar ${auctionToPay.total.toLocaleString()}
                </Button>
              </TabsContent>

              <TabsContent value="new" className="space-y-4">
                <form onSubmit={handleAddCard} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número de tarjeta</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={newCardData.number}
                      onChange={(e) => setNewCardData({ ...newCardData, number: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Fecha de expiración</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/AA"
                        value={newCardData.expiry}
                        onChange={(e) => setNewCardData({ ...newCardData, expiry: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={newCardData.cvv}
                        onChange={(e) => setNewCardData({ ...newCardData, cvv: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                    <Input
                      id="cardName"
                      placeholder="Juan Pérez"
                      value={newCardData.name}
                      onChange={(e) => setNewCardData({ ...newCardData, name: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" variant="outline" className="w-full">
                    Agregar Tarjeta y Pagar
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
