"use client"

import { useState } from "react"
import { ArrowLeft, DollarSign, Gavel, Heart, Share2, Star, Trophy, User } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de prueba para la subasta específica
const obtenerDetallesSubasta = (id: string) => {
  const subastas = {
    "1": {
      id: "1",
      producto: "iPhone 14 Pro Max",
      descripcion:
        "iPhone 14 Pro Max de 256GB en color Grafito. Completamente nuevo, sellado de fábrica. Incluye todos los accesorios originales: cable USB-C a Lightning, documentación y pegatinas Apple. Garantía de un año incluida.",
      imagenes: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      precioInicial: 800,
      precioFinal: 1250,
      incrementoMinimo: 25,
      ganador: {
        nombre: "Carlos Mendoza",
        avatar: "/placeholder.svg?height=40&width=40",
        calificacion: 4.8,
        subastas: 12,
      },
      vendedor: {
        nombre: "TechStore Premium",
        avatar: "/placeholder.svg?height=40&width=40",
        calificacion: 4.9,
        ventas: 245,
        miembro: "2019",
      },
      categoria: "Electrónica",
      fechaInicio: new Date(2023, 5, 10),
      fechaFin: new Date(2023, 5, 15),
      duracion: "5 días",
      numeroOfertas: 15,
      participantes: 8,
      miParticipacion: {
        participe: true,
        ultimaPuja: 1200,
        posicionFinal: 2,
        numeroOfertas: 3,
      },
      historialPujas: [
        { usuario: "Carlos M.", cantidad: 1250, fecha: new Date(2023, 5, 15, 14, 30), esGanadora: true },
        { usuario: "Tú", cantidad: 1200, fecha: new Date(2023, 5, 15, 14, 25), esGanadora: false },
        { usuario: "Ana G.", cantidad: 1150, fecha: new Date(2023, 5, 15, 14, 20), esGanadora: false },
        { usuario: "Miguel T.", cantidad: 1100, fecha: new Date(2023, 5, 15, 14, 15), esGanadora: false },
        { usuario: "Tú", cantidad: 1050, fecha: new Date(2023, 5, 15, 14, 10), esGanadora: false },
        { usuario: "Laura S.", cantidad: 1000, fecha: new Date(2023, 5, 15, 14, 5), esGanadora: false },
        { usuario: "Roberto D.", cantidad: 950, fecha: new Date(2023, 5, 15, 14, 0), esGanadora: false },
        { usuario: "Tú", cantidad: 900, fecha: new Date(2023, 5, 15, 13, 55), esGanadora: false },
      ],
      especificaciones: {
        Marca: "Apple",
        Modelo: "iPhone 14 Pro Max",
        Almacenamiento: "256GB",
        Color: "Grafito",
        Estado: "Nuevo",
        Garantía: "1 año",
        Incluye: "Caja original, cable, documentación",
      },
      condiciones: "Producto completamente nuevo y sellado. No se aceptan devoluciones una vez abierto el paquete.",
      envio: {
        costo: 15,
        tiempo: "2-3 días hábiles",
        metodos: ["Envío estándar", "Envío express"],
      },
    },
    // Agregar más subastas según sea necesario
  }

  return subastas[id as keyof typeof subastas] || null
}

export default function DetalleSubastaPage({ params }: { params: { id: string } }) {
  const [imagenActual, setImagenActual] = useState(0)
  const subasta = obtenerDetallesSubasta(params.id)

  if (!subasta) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Subasta no encontrada</h1>
        <Link href="/subastas-finalizadas">
          <Button>Volver a Subastas Finalizadas</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link href="/subastas-finalizadas">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a Subastas Finalizadas
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Galería de imágenes */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={subasta.imagenes[imagenActual] || "/placeholder.svg"}
                    alt={subasta.producto}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {subasta.imagenes.map((imagen, index) => (
                    <button
                      key={index}
                      onClick={() => setImagenActual(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                        imagenActual === index ? "border-primary" : "border-muted"
                      }`}
                    >
                      <img
                        src={imagen || "/placeholder.svg"}
                        alt={`Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información principal */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{subasta.producto}</CardTitle>
                  <CardDescription>
                    Subasta finalizada el {format(subasta.fechaFin, "dd 'de' MMMM, yyyy", { locale: es })}
                  </CardDescription>
                </div>
                <Badge variant="outline">{subasta.categoria}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Precio Final</div>
                      <div className="text-2xl font-bold text-green-600">${subasta.precioFinal}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gavel className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Precio Inicial</div>
                      <div className="text-lg">${subasta.precioInicial}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Ganador</div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={subasta.ganador.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{subasta.ganador.nombre.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{subasta.ganador.nombre}</span>
                        <span className="text-amber-500">★ {subasta.ganador.calificacion}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Participantes</div>
                      <div className="text-lg">{subasta.participantes} usuarios</div>
                    </div>
                  </div>
                </div>
              </div>

              {subasta.miParticipacion.participe && (
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Tu Participación</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Tu última puja</div>
                      <div className="font-medium">${subasta.miParticipacion.ultimaPuja}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Posición final</div>
                      <div className="font-medium">#{subasta.miParticipacion.posicionFinal}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Ofertas realizadas</div>
                      <div className="font-medium">{subasta.miParticipacion.numeroOfertas}</div>
                    </div>
                  </div>
                </div>
              )}

              <Tabs defaultValue="descripcion">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                  <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
                  <TabsTrigger value="historial">Historial</TabsTrigger>
                  <TabsTrigger value="envio">Envío</TabsTrigger>
                </TabsList>
                <TabsContent value="descripcion" className="mt-4">
                  <p className="text-muted-foreground leading-relaxed">{subasta.descripcion}</p>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Condiciones</h4>
                    <p className="text-sm text-muted-foreground">{subasta.condiciones}</p>
                  </div>
                </TabsContent>
                <TabsContent value="especificaciones" className="mt-4">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(subasta.especificaciones).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <dt className="font-medium">{key}:</dt>
                        <dd className="text-muted-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </TabsContent>
                <TabsContent value="historial" className="mt-4">
                  <div className="space-y-2">
                    {subasta.historialPujas.map((puja, index) => (
                      <div
                        key={index}
                        className={`flex justify-between items-center p-3 rounded-lg ${
                          puja.esGanadora ? "bg-green-50 dark:bg-green-950 border border-green-200" : "bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{puja.usuario}</span>
                          {puja.esGanadora && <Trophy className="h-4 w-4 text-green-600" />}
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${puja.cantidad}</div>
                          <div className="text-xs text-muted-foreground">
                            {format(puja.fecha, "dd/MM HH:mm", { locale: es })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="envio" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Información de Envío</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Costo de envío</div>
                          <div className="font-medium">${subasta.envio.costo}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Tiempo estimado</div>
                          <div className="font-medium">{subasta.envio.tiempo}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Métodos disponibles</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {subasta.envio.metodos.map((metodo, index) => (
                          <li key={index}>• {metodo}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Información del vendedor */}
          <Card>
            <CardHeader>
              <CardTitle>Vendedor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={subasta.vendedor.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{subasta.vendedor.nombre.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{subasta.vendedor.nombre}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span>{subasta.vendedor.calificacion}</span>
                    <span>•</span>
                    <span>{subasta.vendedor.ventas} ventas</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-4">Miembro desde {subasta.vendedor.miembro}</div>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  Ver Perfil
                </Button>
                <Button className="w-full" variant="outline">
                  Contactar Vendedor
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas de la subasta */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total de ofertas</span>
                  <span className="font-medium">{subasta.numeroOfertas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Participantes</span>
                  <span className="font-medium">{subasta.participantes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duración</span>
                  <span className="font-medium">{subasta.duracion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Incremento mínimo</span>
                  <span className="font-medium">${subasta.incrementoMinimo}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Incremento total</span>
                  <span className="font-medium text-green-600">+${subasta.precioFinal - subasta.precioInicial}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acciones */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Heart className="mr-2 h-4 w-4" />
                  Guardar en Favoritos
                </Button>
                <Button className="w-full" variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir Subasta
                </Button>
                <Button className="w-full" variant="outline">
                  Reportar Problema
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
