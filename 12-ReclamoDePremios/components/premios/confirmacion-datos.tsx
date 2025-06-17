"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Premio } from "@/lib/data/premios-mock"
import { Check, Package, Truck } from "lucide-react"

interface ConfirmacionDatosProps {
  premios: Premio[]
  onPremioSelect: (premio: Premio) => void
  onConfirm: () => void
  selectedPremio: Premio | null
}

export default function ConfirmacionDatos({
  premios,
  onPremioSelect,
  onConfirm,
  selectedPremio,
}: ConfirmacionDatosProps) {
  const [direccion, setDireccion] = useState({
    calle: "Av. Libertador 1234",
    ciudad: "Buenos Aires",
    codigoPostal: "C1425",
    pais: "Argentina",
    instrucciones: "",
  })
  const [metodoEntrega, setMetodoEntrega] = useState("domicilio")

  const handleDireccionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDireccion({
      ...direccion,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-lg font-medium mb-4">Selecciona tu Premio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {premios.map((premio) => (
            <Card
              key={premio.id}
              className={`cursor-pointer transition-all ${selectedPremio?.id === premio.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => onPremioSelect(premio)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{premio.nombre}</CardTitle>
                  {selectedPremio?.id === premio.id && <Check className="h-5 w-5 text-primary" />}
                </div>
                <CardDescription>Valor: ${premio.valor}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-muted rounded-md flex items-center justify-center mb-2">
                  <img
                    src={`/placeholder.svg?height=128&width=256&text=${encodeURIComponent(premio.nombre)}`}
                    alt={premio.nombre}
                    className="max-h-full object-contain"
                  />
                </div>
                <p className="text-sm text-muted-foreground">{premio.descripcion}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedPremio && (
        <>
          <div>
            <h3 className="text-lg font-medium mb-4">Confirma tus datos de envío</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calle">Dirección</Label>
                <Input id="calle" name="calle" value={direccion.calle} onChange={handleDireccionChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input id="ciudad" name="ciudad" value={direccion.ciudad} onChange={handleDireccionChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigoPostal">Código Postal</Label>
                <Input
                  id="codigoPostal"
                  name="codigoPostal"
                  value={direccion.codigoPostal}
                  onChange={handleDireccionChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pais">País</Label>
                <Select defaultValue={direccion.pais}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Argentina">Argentina</SelectItem>
                    <SelectItem value="Chile">Chile</SelectItem>
                    <SelectItem value="Uruguay">Uruguay</SelectItem>
                    <SelectItem value="Paraguay">Paraguay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="instrucciones">Instrucciones especiales (opcional)</Label>
                <Textarea
                  id="instrucciones"
                  name="instrucciones"
                  value={direccion.instrucciones}
                  onChange={handleDireccionChange}
                  placeholder="Ej: Dejar con el portero, timbre 2B, etc."
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Método de entrega</h3>
            <RadioGroup
              value={metodoEntrega}
              onValueChange={setMetodoEntrega}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div
                className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer ${metodoEntrega === "domicilio" ? "border-primary bg-primary/5" : "border-input"}`}
              >
                <RadioGroupItem value="domicilio" id="domicilio" />
                <Label htmlFor="domicilio" className="flex items-center cursor-pointer">
                  <Truck className="h-5 w-5 mr-2" />
                  <div>
                    <div className="font-medium">Entrega a domicilio</div>
                    <div className="text-sm text-muted-foreground">3-5 días hábiles</div>
                  </div>
                </Label>
              </div>
              <div
                className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer ${metodoEntrega === "sucursal" ? "border-primary bg-primary/5" : "border-input"}`}
              >
                <RadioGroupItem value="sucursal" id="sucursal" />
                <Label htmlFor="sucursal" className="flex items-center cursor-pointer">
                  <Package className="h-5 w-5 mr-2" />
                  <div>
                    <div className="font-medium">Retiro en sucursal</div>
                    <div className="text-sm text-muted-foreground">Disponible en 2 días hábiles</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end">
            <Button onClick={onConfirm}>Confirmar datos</Button>
          </div>
        </>
      )}
    </div>
  )
}
