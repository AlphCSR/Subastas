"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Filter, Eye } from "lucide-react"
import { mockClaims } from "@/data/mock-claims"
import type { Claim, ClaimStatus } from "@/types/claims"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ClaimsPage() {
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | "all">("all")
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter claims based on selected status
  const filteredClaims =
    statusFilter === "all"
      ? mockClaims.filter((claim) => claim.userId === "user-1") // Simulating current user
      : mockClaims.filter((claim) => claim.userId === "user-1" && claim.status === statusFilter)

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
    }).format(date)
  }

  const viewClaimDetails = (claim: Claim) => {
    setSelectedClaim(claim)
    setIsDialogOpen(true)
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Mis Reclamos</CardTitle>
            <CardDescription>Gestiona y haz seguimiento a tus reclamos</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ClaimStatus | "all")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="in-review">En Revisión</SelectItem>
                  <SelectItem value="resolved">Resueltos</SelectItem>
                  <SelectItem value="rejected">Rechazados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button asChild>
              <Link href="/claims/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                Nuevo Reclamo
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredClaims.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No tienes reclamos {statusFilter !== "all" ? `con estado "${statusFilter}"` : ""}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subasta</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Resolución</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.auctionTitle}</TableCell>
                      <TableCell>{formatDate(claim.createdAt)}</TableCell>
                      <TableCell>{getStatusBadge(claim.status)}</TableCell>
                      <TableCell>
                        {claim.resolution || <span className="text-muted-foreground text-sm italic">Pendiente</span>}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => viewClaimDetails(claim)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Claim Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedClaim && (
            <>
              <DialogHeader>
                <DialogTitle>Detalles del Reclamo</DialogTitle>
                <DialogDescription>Reclamo sobre {selectedClaim.auctionTitle}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium">ID:</div>
                  <div className="col-span-3">{selectedClaim.id}</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium">Estado:</div>
                  <div className="col-span-3">{getStatusBadge(selectedClaim.status)}</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium">Fecha de creación:</div>
                  <div className="col-span-3">{formatDate(selectedClaim.createdAt)}</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium">Última actualización:</div>
                  <div className="col-span-3">{formatDate(selectedClaim.updatedAt)}</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium">Motivo:</div>
                  <div className="col-span-3">{selectedClaim.reason}</div>
                </div>
                {selectedClaim.resolution && (
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-medium">Resolución:</div>
                    <div className="col-span-3">{selectedClaim.resolution}</div>
                  </div>
                )}
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium">Evidencia:</div>
                  <div className="col-span-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {selectedClaim.evidence.map((evidence, index) => (
                        <div key={index} className="relative">
                          <img
                            src={evidence.startsWith("/") ? `/placeholder.svg?height=150&width=200` : evidence}
                            alt={`Evidencia ${index + 1}`}
                            className="h-24 w-full object-cover rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
