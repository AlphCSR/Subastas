"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Calendar, Upload, X, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn, formatCurrency } from "@/lib/utils"
import type { AuctionType } from "@/types/auction"

interface FormData {
  title: string
  description: string
  basePrice: number
  minIncrement: number
  type: AuctionType
  endDate: Date
  rules: string
  imageUrl: string
  featured: boolean
  reservePrice?: number
  decrementInterval?: number
  decrementAmount?: number
}

const initialFormData: FormData = {
  title: "",
  description: "",
  basePrice: 100,
  minIncrement: 10,
  type: "open",
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  rules: "",
  imageUrl: "/placeholder.svg?height=300&width=300",
  featured: false,
  reservePrice: 0,
  decrementInterval: 30, // minutes
  decrementAmount: 50, // amount to decrease in Dutch auctions
}

export function CreateAuctionForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("details")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "El archivo debe ser una imagen" }))
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: "La imagen no debe superar los 5MB" }))
      return
    }

    // Create a preview URL
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewImage(reader.result as string)
      handleChange("imageUrl", reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setPreviewImage(null)
    handleChange("imageUrl", "/placeholder.svg?height=300&width=300")
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio"
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria"
    }

    if (formData.basePrice <= 0) {
      newErrors.basePrice = "El precio base debe ser mayor que 0"
    }

    if (formData.minIncrement <= 0) {
      newErrors.minIncrement = "El incremento mínimo debe ser mayor que 0"
    }

    if (formData.type === "reserve" && (!formData.reservePrice || formData.reservePrice <= formData.basePrice)) {
      newErrors.reservePrice = "El precio de reserva debe ser mayor que el precio base"
    }

    if (formData.type === "dutch") {
      if (!formData.decrementInterval || formData.decrementInterval <= 0) {
        newErrors.decrementInterval = "El intervalo de decremento debe ser mayor que 0"
      }
      if (!formData.decrementAmount || formData.decrementAmount <= 0) {
        newErrors.decrementAmount = "El monto de decremento debe ser mayor que 0"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      setActiveTab("details") // Switch to details tab if there are errors
      return
    }

    setIsSubmitting(true)
    setSuccess(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setSuccess("¡Subasta creada con éxito!")

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/auctions")
      }, 2000)
    } catch (error) {
      setErrors((prev) => ({ ...prev, submit: "Error al crear la subasta. Inténtalo de nuevo." }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const getAuctionTypeDescription = (type: AuctionType): string => {
    switch (type) {
      case "open":
        return "Los postores pueden ver todas las pujas. Gana la puja más alta."
      case "reserve":
        return "Similar a la subasta abierta, pero con un precio mínimo de reserva que debe alcanzarse."
      case "sealed":
        return "Las pujas son privadas. Los postores no pueden ver las pujas de otros hasta que finaliza la subasta."
      case "dutch":
        return "El precio comienza alto y va disminuyendo. El primer postor que acepta el precio gana."
      default:
        return ""
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="details">Detalles básicos</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
            <TabsTrigger value="preview">Vista previa</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TabsContent value="details" className="space-y-6">
              {errors.submit && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.submit}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <Check className="h-4 w-4 mr-2" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className={errors.title ? "text-destructive" : ""}>
                    Título del producto*
                  </Label>
                  <Input
                    id="title"
                    placeholder="Ej: iPhone 15 Pro Max"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className={errors.description ? "text-destructive" : ""}>
                    Descripción*
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe el producto en detalle"
                    className={cn("min-h-[100px]", errors.description ? "border-destructive" : "")}
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                  />
                  {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basePrice" className={errors.basePrice ? "text-destructive" : ""}>
                      Precio base (€)*
                    </Label>
                    <Input
                      id="basePrice"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.basePrice}
                      onChange={(e) => handleChange("basePrice", Number(e.target.value))}
                      className={errors.basePrice ? "border-destructive" : ""}
                    />
                    {errors.basePrice && <p className="text-xs text-destructive">{errors.basePrice}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minIncrement" className={errors.minIncrement ? "text-destructive" : ""}>
                      Incremento mínimo (€)*
                    </Label>
                    <Input
                      id="minIncrement"
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="5.00"
                      value={formData.minIncrement}
                      onChange={(e) => handleChange("minIncrement", Number(e.target.value))}
                      className={errors.minIncrement ? "border-destructive" : ""}
                    />
                    {errors.minIncrement && <p className="text-xs text-destructive">{errors.minIncrement}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="auctionType">Tipo de subasta*</Label>
                  <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                    <SelectTrigger id="auctionType">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Abierta</SelectItem>
                      <SelectItem value="reserve">Con reserva</SelectItem>
                      <SelectItem value="sealed">Sobre cerrado</SelectItem>
                      <SelectItem value="dutch">Holandesa</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">{getAuctionTypeDescription(formData.type)}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Fecha de finalización*</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="duration"
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {formData.endDate ? formData.endDate.toLocaleDateString() : "Selecciona una fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => date && handleChange("endDate", date)}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className={errors.image ? "text-destructive" : ""}>
                    Imagen del producto
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className={errors.image ? "border-destructive" : ""}
                        />
                        {previewImage && (
                          <Button type="button" variant="outline" size="icon" onClick={removeImage}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {errors.image && <p className="text-xs text-destructive mt-1">{errors.image}</p>}
                      <p className="text-xs text-muted-foreground mt-1">
                        Formatos aceptados: JPG, PNG, GIF. Tamaño máximo: 5MB
                      </p>
                    </div>
                    <div className="relative aspect-square border rounded-md overflow-hidden">
                      <Image
                        src={previewImage || formData.imageUrl}
                        alt="Vista previa"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {!previewImage && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setActiveTab("settings")}>
                  Siguiente
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-4">
                {formData.type === "reserve" && (
                  <div className="space-y-2">
                    <Label htmlFor="reservePrice" className={errors.reservePrice ? "text-destructive" : ""}>
                      Precio de reserva (€)*
                    </Label>
                    <Input
                      id="reservePrice"
                      type="number"
                      min={formData.basePrice + 1}
                      step="0.01"
                      placeholder="0.00"
                      value={formData.reservePrice}
                      onChange={(e) => handleChange("reservePrice", Number(e.target.value))}
                      className={errors.reservePrice ? "border-destructive" : ""}
                    />
                    {errors.reservePrice && <p className="text-xs text-destructive">{errors.reservePrice}</p>}
                    <p className="text-xs text-muted-foreground">
                      El precio de reserva es el precio mínimo al que estás dispuesto a vender. No será visible para los
                      postores.
                    </p>
                  </div>
                )}

                {formData.type === "dutch" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="decrementInterval" className={errors.decrementInterval ? "text-destructive" : ""}>
                        Intervalo de decremento (minutos)*
                      </Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="decrementInterval"
                          min={1}
                          max={60}
                          step={1}
                          value={[formData.decrementInterval || 30]}
                          onValueChange={(value) => handleChange("decrementInterval", value[0])}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">{formData.decrementInterval}</span>
                      </div>
                      {errors.decrementInterval && (
                        <p className="text-xs text-destructive">{errors.decrementInterval}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Cada cuántos minutos disminuirá el precio de la subasta.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="decrementAmount" className={errors.decrementAmount ? "text-destructive" : ""}>
                        Monto de decremento (€)*
                      </Label>
                      <Input
                        id="decrementAmount"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="10.00"
                        value={formData.decrementAmount}
                        onChange={(e) => handleChange("decrementAmount", Number(e.target.value))}
                        className={errors.decrementAmount ? "border-destructive" : ""}
                      />
                      {errors.decrementAmount && <p className="text-xs text-destructive">{errors.decrementAmount}</p>}
                      <p className="text-xs text-muted-foreground">Cuánto disminuirá el precio en cada intervalo.</p>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="rules">Reglas adicionales</Label>
                  <Textarea
                    id="rules"
                    placeholder="Reglas específicas para esta subasta (opcional)"
                    className="min-h-[80px]"
                    value={formData.rules}
                    onChange={(e) => handleChange("rules", e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured">Destacar subasta</Label>
                    <p className="text-xs text-muted-foreground">
                      Las subastas destacadas aparecen en la parte superior de la lista
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleChange("featured", checked)}
                  />
                </div>
              </div>

              <div className="flex justify-between gap-2">
                <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                  Anterior
                </Button>
                <Button type="button" variant="outline" onClick={() => setActiveTab("preview")}>
                  Vista previa
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={previewImage || formData.imageUrl}
                    alt={formData.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    {formData.type === "open" && "Abierta"}
                    {formData.type === "reserve" && "Con reserva"}
                    {formData.type === "sealed" && "Sobre cerrado"}
                    {formData.type === "dutch" && "Holandesa"}
                  </Badge>
                  {formData.featured && (
                    <Badge className="absolute top-2 left-2" variant="default">
                      Destacada
                    </Badge>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold">{formData.title || "Título del producto"}</h2>
                  <p className="text-muted-foreground mt-1">{formData.description || "Descripción del producto"}</p>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium">Precio base</h3>
                      <p>{formatCurrency(formData.basePrice)}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Incremento mínimo</h3>
                      <p>{formatCurrency(formData.minIncrement)}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Fecha de inicio</h3>
                      <p>{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Fecha de finalización</h3>
                      <p>{formData.endDate.toLocaleDateString()}</p>
                    </div>
                  </div>

                  {formData.rules && (
                    <div className="mt-4">
                      <h3 className="font-medium">Reglas adicionales</h3>
                      <p className="text-muted-foreground">{formData.rules}</p>
                    </div>
                  )}

                  {formData.type === "dutch" && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <h3 className="font-medium">Configuración de subasta holandesa</h3>
                      <p className="text-sm">
                        El precio disminuirá {formatCurrency(formData.decrementAmount || 0)} cada{" "}
                        {formData.decrementInterval || 0} minutos.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-2">
                <Button type="button" variant="outline" onClick={() => setActiveTab("settings")}>
                  Anterior
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creando subasta..." : "Crear subasta"}
                </Button>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-6 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Información de la subasta</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Tipo:</dt>
                  <dd className="font-medium">
                    {formData.type === "open" && "Abierta"}
                    {formData.type === "reserve" && "Con reserva"}
                    {formData.type === "sealed" && "Sobre cerrado"}
                    {formData.type === "dutch" && "Holandesa"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Precio base:</dt>
                  <dd className="font-medium">{formatCurrency(formData.basePrice)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Incremento mínimo:</dt>
                  <dd className="font-medium">{formatCurrency(formData.minIncrement)}</dd>
                </div>
                {formData.type === "reserve" && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Precio de reserva:</dt>
                    <dd className="font-medium">{formatCurrency(formData.reservePrice || 0)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Duración:</dt>
                  <dd className="font-medium">
                    {Math.ceil((formData.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Consejos para crear subastas exitosas</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>Incluye fotos de alta calidad para atraer más postores.</span>
                </li>
                <li className="flex gap-2">
                  <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>Describe el producto con detalle, incluyendo cualquier defecto o característica especial.</span>
                </li>
                <li className="flex gap-2">
                  <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>Establece un precio base razonable para atraer a los primeros postores.</span>
                </li>
                <li className="flex gap-2">
                  <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>Las subastas con duración de 5-7 días suelen tener mejor rendimiento.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
