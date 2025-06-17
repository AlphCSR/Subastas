"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertCircle, Upload, X } from "lucide-react"
import { mockAuctions } from "@/data/mock-claims"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export default function CreateClaimPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedAuction, setSelectedAuction] = useState("")
  const [reason, setReason] = useState("")
  const [evidence, setEvidence] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)

      // Simulate file upload by creating object URLs for preview
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls([...previewUrls, ...newPreviewUrls])

      // In a real app, you would upload these files to a server
      // For now, we'll just pretend we have the URLs
      const mockUploadedUrls = newFiles.map((file, index) => `/evidence/uploaded-${Date.now()}-${index}.png`)
      setEvidence([...evidence, ...mockUploadedUrls])
    }
  }

  const removeFile = (index: number) => {
    const newEvidence = [...evidence]
    newEvidence.splice(index, 1)
    setEvidence(newEvidence)

    const newPreviewUrls = [...previewUrls]
    URL.revokeObjectURL(newPreviewUrls[index])
    newPreviewUrls.splice(index, 1)
    setPreviewUrls(newPreviewUrls)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAuction) {
      toast({
        title: "Error",
        description: "Por favor selecciona una subasta",
        variant: "destructive",
      })
      return
    }

    if (!reason) {
      toast({
        title: "Error",
        description: "Por favor describe el motivo de tu reclamo",
        variant: "destructive",
      })
      return
    }

    if (evidence.length === 0) {
      toast({
        title: "Error",
        description: "Por favor adjunta al menos una evidencia",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Reclamo enviado",
      description: "Tu reclamo ha sido enviado correctamente y será revisado por nuestro equipo.",
    })

    setIsSubmitting(false)
    router.push("/claims")
  }

  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Crear Nuevo Reclamo</CardTitle>
          <CardDescription>Completa el formulario para reportar un problema con una subasta</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="auction">Subasta Afectada</Label>
              <Select value={selectedAuction} onValueChange={setSelectedAuction}>
                <SelectTrigger id="auction">
                  <SelectValue placeholder="Selecciona una subasta" />
                </SelectTrigger>
                <SelectContent>
                  {mockAuctions.map((auction) => (
                    <SelectItem key={auction.id} value={auction.id}>
                      {auction.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo del Reclamo</Label>
              <Textarea
                id="reason"
                placeholder="Describe detalladamente el problema que has experimentado"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label>Evidencia</Label>
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium">Arrastra archivos aquí o haz clic para seleccionar</span>
                  <span className="text-xs text-gray-500">Soporta imágenes JPG, PNG (máx. 5MB cada una)</span>
                </Label>
              </div>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Evidencia ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Importante</AlertTitle>
              <AlertDescription>
                Proporciona toda la información relevante y evidencia que respalde tu reclamo. Los reclamos falsos
                pueden resultar en la suspensión de tu cuenta.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Reclamo"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
