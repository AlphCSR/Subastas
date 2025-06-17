"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Eye, CheckCircle, XCircle } from "lucide-react"
import { mockClaims } from "@/data/mock-claims"
import type { Claim, ClaimStatus } from "@/types/claims"
import { useToast } from "@/hooks/use-toast"

export default function AdminClaimsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<ClaimStatus | "all">("pending")
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [resolution, setResolution] = useState("")
  const [adminNotes, setAdminNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Filter claims based on selected tab
  const filteredClaims = activeTab === "all" ? mockClaims : mockClaims.filter((claim) => claim.status === activeTab)

  const getStatusBadge = (status: ClaimStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pendiente
          </Badge>
        )
      case "in-review":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            En Revisión
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resuelto
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rechazado
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const viewClaimDetails = (claim: Claim) => {
    setSelectedClaim(claim)
    setResolution(claim.resolution || "")
    setAdminNotes(claim.adminNotes || "")
    setIsDialogOpen(true)
  }

  const handleStatusChange = async (newStatus: ClaimStatus) => {
    if (!selectedClaim) return

    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would update the claim in your database
    toast({
      title: "Estado actualizado",
      description: `El reclamo ha sido marcado como ${
        newStatus === "resolved"
          ? "resuelto"
          : newStatus === "rejected"
            ? "rechazado"
            : newStatus === "in-review"
              ? "en revisión"
              : "pendiente"
      }.`,
    })

    setIsProcessing(false)
    setIsDialogOpen(false)
  }

  const handleSaveResolution = async () => {
    if (!selectedClaim) return

    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would update the claim in your database
    toast({
      title: "Resolución guardada",
      description: "La resolución y notas han sido guardadas correctamente.",
    })

    setIsProcessing(false)
    setIsDialogOpen(false)
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Panel de Soporte - Gestión de Reclamos</CardTitle>
          <CardDescription>Revisa y gestiona los reclamos de los usuarios</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ClaimStatus | "all")}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="all">
                Todos
                <Badge variant="secondary" className="ml-2">
                  {mockClaims.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pendientes
                <Badge variant="secondary" className="ml-2">
                  {mockClaims.filter((c) => c.status === "pending").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="in-review">
                En Revisión
                <Badge variant="secondary" className="ml-2">
                  {mockClaims.filter((c) => c.status === "in-review").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="resolved">
                Resueltos
                <Badge variant="secondary" className="ml-2">
                  {mockClaims.filter((c) => c.status === "resolved").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rechazados
                <Badge variant="secondary" className="ml-2">
                  {mockClaims.filter((c) => c.status === "rejected").length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredClaims.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No hay reclamos {activeTab !== "all" ? `con estado "${activeTab}"` : ""}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Subasta</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClaims.map((claim) => (
                        <TableRow key={claim.id}>
                          <TableCell className="font-mono text-xs">{claim.id}</TableCell>
                          <TableCell className="font-medium">{claim.userId}</TableCell>
                          <TableCell>{claim.auctionTitle}</TableCell>
                          <TableCell>{formatDate(claim.createdAt)}</TableCell>
                          <TableCell>{getStatusBadge(claim.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => viewClaimDetails(claim)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Revisar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Claim Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedClaim && (
            <>
              <DialogHeader>
                <DialogTitle>Revisión de Reclamo</DialogTitle>
                <DialogDescription>
                  ID: {selectedClaim.id} | Subasta: {selectedClaim.auctionTitle}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Información del Reclamo</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Usuario:</div>
                        <div className="col-span-2 text-sm">{selectedClaim.userId}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Estado:</div>
                        <div className="col-span-2">{getStatusBadge(selectedClaim.status)}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Creado:</div>
                        <div className="col-span-2 text-sm">{formatDate(selectedClaim.createdAt)}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Actualizado:</div>
                        <div className="col-span-2 text-sm">{formatDate(selectedClaim.updatedAt)}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Motivo del Reclamo</h3>
                    <div className="p-3 bg-muted rounded-md text-sm">{selectedClaim.reason}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Evidencia</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {selectedClaim.evidence.map((evidence, index) => (
                      <div key={index} className="relative">
                        <img
                          src={evidence.startsWith("/") ? `/placeholder.svg?height=150&width=200` : evidence}
                          alt={`Evidencia ${index + 1}`}
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute bottom-2 right-2 opacity-90"
                          onClick={() =>
                            window.open(
                              evidence.startsWith("/") ? `/placeholder.svg?height=800&width=1200` : evidence,
                              "_blank",
                            )
                          }
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Ampliar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Resolución para el Usuario</h3>
                    <Textarea
                      placeholder="Escribe la resolución que será visible para el usuario..."
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Notas Internas (solo para administradores)</h3>
                    <Textarea
                      placeholder="Notas internas sobre este caso..."
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex justify-start gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange("in-review")}
                    disabled={isProcessing || selectedClaim.status === "in-review"}
                  >
                    Marcar En Revisión
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" onClick={() => handleStatusChange("rejected")} disabled={isProcessing}>
                    <XCircle className="h-4 w-4 mr-1" />
                    Rechazar
                  </Button>
                  <Button variant="default" onClick={() => handleStatusChange("resolved")} disabled={isProcessing}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Resolver
                  </Button>
                  <Button variant="secondary" onClick={handleSaveResolution} disabled={isProcessing}>
                    Guardar Notas
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
