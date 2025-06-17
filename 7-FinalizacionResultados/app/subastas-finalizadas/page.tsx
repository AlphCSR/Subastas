"use client"

import { useState } from "react"
import { CalendarIcon, FilterIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Actualizar los datos de prueba para incluir información sobre el tipo de participación
const subastasFinalizadas = [
  {
    id: "1",
    producto: "iPhone 14 Pro Max",
    imagen: "/placeholder.svg?height=80&width=80",
    precioInicial: 800,
    precioFinal: 1250,
    ganador: "Carlos Mendoza",
    categoria: "Electrónica",
    fecha: new Date(2023, 5, 15),
    participacion: true,
    tipoParticipacion: "puja", // "puja", "subasta_propia", "ninguna"
    esGanador: false,
    numeroOfertas: 15,
    miUltimaPuja: 1200,
  },
  {
    id: "2",
    producto: "MacBook Pro M2",
    imagen: "/placeholder.svg?height=80&width=80",
    precioInicial: 1200,
    precioFinal: 1800,
    ganador: "Ana Gómez",
    categoria: "Computadoras",
    fecha: new Date(2023, 5, 20),
    participacion: true,
    tipoParticipacion: "subasta_propia",
    esGanador: false,
    numeroOfertas: 23,
    miUltimaPuja: null,
  },
  {
    id: "3",
    producto: "PlayStation 5",
    imagen: "/placeholder.svg?height=80&width=80",
    precioInicial: 400,
    precioFinal: 650,
    ganador: "Miguel Torres",
    categoria: "Videojuegos",
    fecha: new Date(2023, 6, 5),
    participacion: true,
    tipoParticipacion: "puja",
    esGanador: true,
    numeroOfertas: 18,
    miUltimaPuja: 650,
  },
  {
    id: "4",
    producto: "Bicicleta de Montaña Trek",
    imagen: "/placeholder.svg?height=80&width=80",
    precioInicial: 500,
    precioFinal: 780,
    ganador: "Laura Sánchez",
    categoria: "Deportes",
    fecha: new Date(2023, 6, 12),
    participacion: false,
    tipoParticipacion: "ninguna",
    esGanador: false,
    numeroOfertas: 12,
    miUltimaPuja: null,
  },
  {
    id: "5",
    producto: "Cámara Sony Alpha A7 III",
    imagen: "/placeholder.svg?height=80&width=80",
    precioInicial: 1800,
    precioFinal: 2100,
    ganador: "Roberto Díaz",
    categoria: "Fotografía",
    fecha: new Date(2023, 6, 18),
    participacion: true,
    tipoParticipacion: "puja",
    esGanador: false,
    numeroOfertas: 8,
    miUltimaPuja: 1950,
  },
  {
    id: "6",
    producto: "Reloj Smartwatch Apple",
    imagen: "/placeholder.svg?height=80&width=80",
    precioInicial: 300,
    precioFinal: 420,
    ganador: "Tú",
    categoria: "Electrónica",
    fecha: new Date(2023, 6, 25),
    participacion: true,
    tipoParticipacion: "subasta_propia",
    esGanador: false,
    numeroOfertas: 9,
    miUltimaPuja: null,
  },
]

// Categorías disponibles
const categorias = ["Todas", "Electrónica", "Computadoras", "Videojuegos", "Deportes", "Fotografía"]

export default function SubastasFinalizadasPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategoria, setSelectedCategoria] = useState("Todas")
  const [soloParticipacion, setSoloParticipacion] = useState(false)
  // Agregar estado para el filtro de tipo de subasta
  const [tipoSubasta, setTipoSubasta] = useState("todas")

  // Actualizar la función de filtrado
  const subastasFiltradas = subastasFinalizadas.filter((subasta) => {
    // Filtro por búsqueda
    const matchesSearch =
      subasta.producto.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subasta.ganador.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtro por categoría
    const matchesCategoria = selectedCategoria === "Todas" || subasta.categoria === selectedCategoria

    // Filtro por participación
    const matchesParticipacion = !soloParticipacion || subasta.participacion

    // Filtro por fecha
    const matchesDate =
      !date ||
      (subasta.fecha.getDate() === date.getDate() &&
        subasta.fecha.getMonth() === date.getMonth() &&
        subasta.fecha.getFullYear() === date.getFullYear())

    // Filtro por tipo de subasta
    const matchesTipo =
      tipoSubasta === "todas" ||
      (tipoSubasta === "mis-subastas" && subasta.tipoParticipacion === "subasta_propia") ||
      (tipoSubasta === "mis-pujas" && subasta.tipoParticipacion === "puja")

    return matchesSearch && matchesCategoria && matchesParticipacion && matchesDate && matchesTipo
  })

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Subastas Finalizadas</CardTitle>
              <CardDescription>Visualiza todas las subastas que han concluido y sus resultados</CardDescription>
            </div>
            {/* Actualizar el componente Tabs para que sea funcional */}
            <Tabs value={tipoSubasta} onValueChange={setTipoSubasta} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="mis-subastas">Mis Subastas</TabsTrigger>
                <TabsTrigger value="mis-pujas">Mis Pujas</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Buscar por producto o ganador..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <FilterIcon className="h-4 w-4" />
                    Categoría: {selectedCategoria}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {categorias.map((categoria) => (
                    <DropdownMenuCheckboxItem
                      key={categoria}
                      checked={selectedCategoria === categoria}
                      onCheckedChange={() => setSelectedCategoria(categoria)}
                    >
                      {categoria}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy", { locale: es }) : "Fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>

              <Button
                variant={soloParticipacion ? "default" : "outline"}
                onClick={() => setSoloParticipacion(!soloParticipacion)}
              >
                Mis Participaciones
              </Button>

              {(date || selectedCategoria !== "Todas" || soloParticipacion || tipoSubasta !== "todas") && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setDate(undefined)
                    setSelectedCategoria("Todas")
                    setSoloParticipacion(false)
                    setTipoSubasta("todas")
                  }}
                >
                  Limpiar Filtros
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="hidden md:table-cell">Categoría</TableHead>
                  <TableHead>Precio Final</TableHead>
                  <TableHead>Ganador</TableHead>
                  <TableHead className="hidden md:table-cell">Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subastasFiltradas.length > 0 ? (
                  subastasFiltradas.map((subasta) => (
                    <TableRow key={subasta.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={subasta.imagen || "/placeholder.svg"}
                            alt={subasta.producto}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                          <div>
                            <div className="font-medium">{subasta.producto}</div>
                            <div className="text-sm text-muted-foreground md:hidden">{subasta.categoria}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{subasta.categoria}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">${subasta.precioFinal}</div>
                        <div className="text-sm text-muted-foreground">Inicial: ${subasta.precioInicial}</div>
                      </TableCell>
                      {/* Actualizar la celda de Ganador para mostrar más información */}
                      <TableCell>
                        <div className="font-medium">{subasta.ganador}</div>
                        <div className="flex gap-1 mt-1">
                          {subasta.participacion && (
                            <Badge variant="outline" className="text-xs">
                              {subasta.tipoParticipacion === "puja" ? "Participaste" : "Tu Subasta"}
                            </Badge>
                          )}
                          {subasta.esGanador && <Badge className="bg-green-500 text-xs">¡Ganaste!</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(subasta.fecha, "dd/MM/yyyy", { locale: es })}
                      </TableCell>
                      {/* Actualizar el botón de acciones para navegar a detalles */}
                      <TableCell className="text-right">
                        <Link href={`/subastas-finalizadas/${subasta.id}`}>
                          <Button variant="ghost" size="sm">
                            Ver Detalles
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      No se encontraron subastas con los filtros seleccionados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
