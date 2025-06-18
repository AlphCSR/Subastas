"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, FileText, MessageSquare, Clock, CheckCircle, XCircle, Upload } from "lucide-react"

interface Claim {
  id: string
  auctionTitle: string
  reason: string
  description: string
  status: "pending" | "in_review" | "resolved" | "rejected"
  createdDate: string
  resolvedDate?: string
  adminResponse?: string
  evidence?: string[]
}

export function ClaimsView() {
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: "1",
      auctionTitle: "Reloj Vintage Omega",
      reason: "Producto no recibido",
      description: "Han pasado 15 días desde el pago y no he recibido el producto.",
      status: "in_review",
      createdDate: "2024-01-10",
      evidence: ["receipt.pdf", "tracking_info.png"],
    },
    {
      id: "2",
      auctionTitle: "Pintura Original",
      reason: "Producto dañado",
      description: "El producto llegó con daños que no se mostraban en las fotos.",
      status: "resolved",
      createdDate: "2024-01-05",
      resolvedDate: "2024-01-08",
      adminResponse: "Se ha procesado el reembolso completo. Disculpe las molestias.",
      evidence: ["damage_photo1.jpg", "damage_photo2.jpg"],
    },
  ])

  const [isCreatingClaim, setIsCreatingClaim] = useState(false)
  const [newClaim, setNewClaim] = useState({
    auctionId: "",
    reason: "",
    description: "",
    evidence: [] as File[],
  })

  const { toast } = useToast()

  const claimReasons = [
    "Producto no recibido",
    "Producto dañado",
    "Producto no coincide con la descripción",
    "Problema con el pago",
    "Problema con el vendedor",
    "Otro",
  ]

  const [showEditModal, setShowEditModal] = useState<Claim | null>(null)
  const [editClaimData, setEditClaimData] = useState({
    reason: "",
    description: "",
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "in_review":
        return <Badge className="bg-blue-100 text-blue-800">En Revisión</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resuelto</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rechazado</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "in_review":
        return <MessageSquare className="h-5 w-5 text-blue-600" />
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  const handleCreateClaim = (e: React.FormEvent) => {
    e.preventDefault()

    const claim: Claim = {
      id: Date.now().toString(),
      auctionTitle: "Subasta Ejemplo", // En una app real, esto vendría de la selección
      reason: newClaim.reason,
      description: newClaim.description,
      status: "pending",
      createdDate: new Date().toISOString().split("T")[0],
      evidence: newClaim.evidence.map((file) => file.name),
    }

    setClaims([claim, ...claims])
    setNewClaim({ auctionId: "", reason: "", description: "", evidence: [] })
    setIsCreatingClaim(false)

    toast({
      title: "Reclamo creado",
      description: "Tu reclamo ha sido enviado y será revisado pronto.",
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setNewClaim((prev) => ({
        ...prev,
        evidence: [...prev.evidence, ...files],
      }))
    }
  }

  const handleEditClaim = (claim: Claim) => {
    setShowEditModal(claim)
    setEditClaimData({
      reason: claim.reason,
      description: claim.description,
    })
  }

  const handleSaveEditClaim = () => {
    if (!showEditModal) return

    setClaims((prevClaims) =>
      prevClaims.map((claim) =>
        claim.id === showEditModal.id
          ? { ...claim, reason: editClaimData.reason, description: editClaimData.description }
          : claim,
      ),
    )

    setShowEditModal(null)
    toast({
      title: "Reclamo actualizado",
      description: "Los detalles del reclamo han sido actualizados.",
    })
  }

  const handleCancelClaim = (claimId: string) => {
    setClaims((prevClaims) => prevClaims.filter((claim) => claim.id !== claimId))
    toast({
      title: "Reclamo cancelado",
      description: "El reclamo ha sido cancelado exitosamente.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reclamos y Disputas</h1>
          <p className="text-gray-600">Gestiona tus reclamos y disputas</p>
        </div>

        <Dialog open={isCreatingClaim} onOpenChange={setIsCreatingClaim}>
          <DialogTrigger asChild>
            <Button>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Crear Reclamo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Reclamo</DialogTitle>
              <DialogDescription>Describe tu problema y proporciona evidencia si es necesario</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateClaim} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="auction">Subasta afectada</Label>
                <Select
                  value={newClaim.auctionId}
                  onValueChange={(value) => setNewClaim({ ...newClaim, auctionId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la subasta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Reloj Vintage Omega</SelectItem>
                    <SelectItem value="2">Pintura Original</SelectItem>
                    <SelectItem value="3">Guitarra Fender</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo del reclamo</Label>
                <Select value={newClaim.reason} onValueChange={(value) => setNewClaim({ ...newClaim, reason: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    {claimReasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción detallada</Label>
                <Textarea
                  id="description"
                  placeholder="Describe tu problema en detalle..."
                  value={newClaim.description}
                  onChange={(e) => setNewClaim({ ...newClaim, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidence">Evidencia (opcional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    id="evidence"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="evidence" className="cursor-pointer flex flex-col items-center space-y-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600">Haz clic para subir archivos o arrastra aquí</span>
                    <span className="text-xs text-gray-500">Imágenes y PDFs hasta 10MB</span>
                  </label>
                </div>

                {newClaim.evidence.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Archivos seleccionados:</p>
                    {newClaim.evidence.map((file, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreatingClaim(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Crear Reclamo
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="my-claims" className="space-y-6">
        <TabsList>
          <TabsTrigger value="my-claims">Mis Reclamos</TabsTrigger>
          <TabsTrigger value="create-claim">Crear Reclamo</TabsTrigger>
        </TabsList>

        <TabsContent value="my-claims" className="space-y-4">
          {claims.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No tienes reclamos</h3>
                <p className="text-gray-600 mb-4">Cuando tengas algún problema, podrás crear un reclamo aquí</p>
                <Button onClick={() => setIsCreatingClaim(true)}>Crear Primer Reclamo</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {claims.map((claim) => (
                <Card key={claim.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center space-x-2">
                          {getStatusIcon(claim.status)}
                          <span>{claim.auctionTitle}</span>
                        </CardTitle>
                        <CardDescription>{claim.reason}</CardDescription>
                      </div>
                      {getStatusBadge(claim.status)}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Descripción:</h4>
                      <p className="text-gray-600">{claim.description}</p>
                    </div>

                    {claim.evidence && claim.evidence.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Evidencia:</h4>
                        <div className="flex flex-wrap gap-2">
                          {claim.evidence.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded">
                              <FileText className="h-4 w-4" />
                              <span className="text-sm">{file}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Creado: {new Date(claim.createdDate).toLocaleDateString()}</span>
                      {claim.resolvedDate && <span>Resuelto: {new Date(claim.resolvedDate).toLocaleDateString()}</span>}
                    </div>

                    {claim.adminResponse && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 text-blue-800">Respuesta del Administrador:</h4>
                        <p className="text-blue-700">{claim.adminResponse}</p>
                      </div>
                    )}

                    {claim.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditClaim(claim)}>
                          Editar Reclamo
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleCancelClaim(claim.id)}
                        >
                          Cancelar Reclamo
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="create-claim">
          <Card>
            <CardHeader>
              <CardTitle>Crear Nuevo Reclamo</CardTitle>
              <CardDescription>Si tienes algún problema con una subasta, puedes crear un reclamo aquí</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setIsCreatingClaim(true)} className="w-full">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Abrir Formulario de Reclamo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de editar reclamo */}
      {showEditModal && (
        <Dialog open={!!showEditModal} onOpenChange={() => setShowEditModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Reclamo</DialogTitle>
              <DialogDescription>Modifica los detalles de tu reclamo</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editReason">Motivo del reclamo</Label>
                <Select
                  value={editClaimData.reason}
                  onValueChange={(value) => setEditClaimData({ ...editClaimData, reason: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {claimReasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editDescription">Descripción</Label>
                <Textarea
                  id="editDescription"
                  value={editClaimData.description}
                  onChange={(e) => setEditClaimData({ ...editClaimData, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowEditModal(null)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleSaveEditClaim} className="flex-1">
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
