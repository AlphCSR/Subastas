"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useApi } from "@/hooks/use-api"
import { Loader2, Save } from "lucide-react"

export function CreateAuctionView() {
  const { loading, executeRequest } = useApi()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    basePrice: "",
    minIncrement: "",
    duration: "",
    auctionType: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!formData.title || !formData.basePrice || !formData.duration) {
      executeRequest(
        () => Promise.reject(new Error("Por favor completa todos los campos obligatorios")),
        undefined,
        "Por favor completa todos los campos obligatorios",
      )
      return
    }

    const result = await executeRequest(async () => {
      const response = await fetch("/api/auctions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create auction")
      }

      return response.json()
    }, "¡Subasta creada exitosamente!")

    if (result?.success) {
      // Limpiar formulario
      setFormData({
        title: "",
        description: "",
        category: "",
        basePrice: "",
        minIncrement: "",
        duration: "",
        auctionType: "",
      })
    }
  }

  const handleSaveDraft = async () => {
    // Validación básica para borrador
    if (!formData.title) {
      executeRequest(
        () => Promise.reject(new Error("El título es requerido para guardar como borrador")),
        undefined,
        "El título es requerido para guardar como borrador",
      )
      return
    }

    const result = await executeRequest(async () => {
      const response = await fetch("/api/auctions/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save draft")
      }

      return response.json()
    }, "Borrador guardado exitosamente")

    if (result?.success) {
      // Limpiar formulario parcialmente (mantener algunos datos)
      setFormData({
        ...formData,
        title: "",
        description: "",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Crear Nueva Subasta</h1>
        <p className="text-gray-600">Configura una nueva subasta para tus productos</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Detalles de la Subasta</CardTitle>
          <CardDescription>Completa la información para crear tu subasta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título de la subasta *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Ej: Reloj Vintage Omega Seamaster"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe el producto en detalle..."
                rows={4}
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange("category", value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relojes">Relojes</SelectItem>
                    <SelectItem value="arte">Arte</SelectItem>
                    <SelectItem value="instrumentos">Instrumentos</SelectItem>
                    <SelectItem value="joyas">Joyas</SelectItem>
                    <SelectItem value="coleccionables">Coleccionables</SelectItem>
                    <SelectItem value="otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auctionType">Tipo de subasta</Label>
                <Select
                  value={formData.auctionType}
                  onValueChange={(value) => handleChange("auctionType", value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de subasta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Subasta abierta</SelectItem>
                    <SelectItem value="reserve">Con precio de reserva</SelectItem>
                    <SelectItem value="dutch">Subasta holandesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="basePrice">Precio base ($) *</Label>
                <Input
                  id="basePrice"
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) => handleChange("basePrice", e.target.value)}
                  placeholder="100"
                  min="1"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minIncrement">Incremento mínimo ($)</Label>
                <Input
                  id="minIncrement"
                  type="number"
                  value={formData.minIncrement}
                  onChange={(e) => handleChange("minIncrement", e.target.value)}
                  placeholder="10"
                  min="1"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duración (horas) *</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => handleChange("duration", value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la duración" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hora</SelectItem>
                  <SelectItem value="3">3 horas</SelectItem>
                  <SelectItem value="6">6 horas</SelectItem>
                  <SelectItem value="12">12 horas</SelectItem>
                  <SelectItem value="24">24 horas</SelectItem>
                  <SelectItem value="48">48 horas</SelectItem>
                  <SelectItem value="72">72 horas</SelectItem>
                  <SelectItem value="168">1 semana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Crear Subasta
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={handleSaveDraft} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Guardar como borrador
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
