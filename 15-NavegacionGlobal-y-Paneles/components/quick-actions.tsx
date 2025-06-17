"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Gavel, Plus, Search, Filter } from "lucide-react"
import { toast } from "sonner"

interface QuickActionsProps {
  userType: "usuario" | "subastador" | "admin"
}

export function QuickActions({ userType }: QuickActionsProps) {
  const [bidAmount, setBidAmount] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleBid = () => {
    if (bidAmount) {
      toast.success(`Puja de ${bidAmount}€ realizada con éxito`)
      setBidAmount("")
      setIsDialogOpen(false)
    }
  }

  const handleSearch = () => {
    if (searchTerm) {
      toast.info(`Buscando: ${searchTerm}`)
    }
  }

  const actions = {
    usuario: [
      {
        label: "Pujar Rápido",
        icon: <Gavel className="h-4 w-4" />,
        variant: "default" as const,
        dialog: true,
      },
      {
        label: "Buscar Subastas",
        icon: <Search className="h-4 w-4" />,
        variant: "outline" as const,
        action: handleSearch,
      },
    ],
    subastador: [
      {
        label: "Nueva Subasta",
        icon: <Plus className="h-4 w-4" />,
        variant: "default" as const,
        action: () => toast.info("Redirigiendo a crear subasta..."),
      },
      {
        label: "Filtrar Ventas",
        icon: <Filter className="h-4 w-4" />,
        variant: "outline" as const,
        action: () => toast.info("Aplicando filtros..."),
      },
    ],
    admin: [
      {
        label: "Nuevo Usuario",
        icon: <Plus className="h-4 w-4" />,
        variant: "default" as const,
        action: () => toast.info("Creando nuevo usuario..."),
      },
      {
        label: "Exportar Datos",
        icon: <Search className="h-4 w-4" />,
        variant: "outline" as const,
        action: () => toast.success("Exportando datos..."),
      },
    ],
  }

  return (
    <div className="flex gap-2 mb-6">
      {actions[userType].map((action, index) => (
        <div key={index}>
          {action.dialog ? (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant={action.variant} className="flex items-center gap-2">
                  {action.icon}
                  {action.label}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Realizar Puja Rápida</DialogTitle>
                  <DialogDescription>Ingresa el monto de tu puja para la subasta seleccionada.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Monto
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleBid}>Confirmar Puja</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Button variant={action.variant} className="flex items-center gap-2" onClick={action.action}>
              {action.icon}
              {action.label}
            </Button>
          )}
        </div>
      ))}
      {userType === "usuario" && (
        <div className="flex items-center gap-2 ml-4">
          <Input
            placeholder="Buscar subastas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="ghost" size="icon" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
