"use client"

import { useState } from "react"
import { CreditCard, Building, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { mockAuctionWon } from "@/lib/mock-data"

export default function PagoSubasta() {
  const [paymentMethod, setPaymentMethod] = useState<string>("tarjeta")
  const [isPaying, setIsPaying] = useState(false)
  const [isPaid, setIsPaid] = useState(false)

  const handlePay = () => {
    setIsPaying(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsPaying(false)
      setIsPaid(true)
    }, 2000)
  }

  if (isPaid) {
    return (
      <Alert className="bg-green-50 border-green-200 mb-6">
        <AlertTitle className="text-green-800">¡Pago completado con éxito!</AlertTitle>
        <AlertDescription className="text-green-700">
          Tu pago por {mockAuctionWon.title} ha sido procesado correctamente. Recibirás un correo electrónico con los
          detalles.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Pago</CardTitle>
          <CardDescription>Detalles del producto ganado en la subasta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
              <img
                src={mockAuctionWon.imageUrl || "/placeholder.svg"}
                alt={mockAuctionWon.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{mockAuctionWon.title}</h3>
              <p className="text-sm text-muted-foreground">Subasta #{mockAuctionWon.id}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Precio final</span>
              <span>${mockAuctionWon.finalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Comisión</span>
              <span>${mockAuctionWon.fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Envío</span>
              <span>${mockAuctionWon.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-medium border-t mt-2">
              <span>Total</span>
              <span>${mockAuctionWon.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Método de Pago</CardTitle>
          <CardDescription>Selecciona cómo quieres pagar</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            <div className="flex items-center space-x-2 border rounded-md p-4">
              <RadioGroupItem value="tarjeta" id="tarjeta" />
              <Label htmlFor="tarjeta" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="h-4 w-4" />
                <span>Tarjeta de crédito/débito</span>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-md p-4">
              <RadioGroupItem value="banco" id="banco" />
              <Label htmlFor="banco" className="flex items-center gap-2 cursor-pointer">
                <Building className="h-4 w-4" />
                <span>Cuenta bancaria</span>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-md p-4">
              <RadioGroupItem value="billetera" id="billetera" />
              <Label htmlFor="billetera" className="flex items-center gap-2 cursor-pointer">
                <Wallet className="h-4 w-4" />
                <span>Billetera digital</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePay} disabled={isPaying} className="w-full">
            {isPaying ? "Procesando..." : "Pagar ahora"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
