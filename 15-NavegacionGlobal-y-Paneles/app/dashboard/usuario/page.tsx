import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { subastasActivas, pujasRecientes } from "@/lib/mock-data"

// Importar los nuevos componentes
import { StatsCard } from "@/components/stats-card"
import { QuickActions } from "@/components/quick-actions"
import { Gavel, TrendingUp, Clock, Trophy } from "lucide-react"

export default function UsuarioDashboard() {
  // Reemplazar todo el contenido del return con:
  return (
    <DashboardLayout userType="usuario">
      <div className="flex flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel de Usuario</h1>
          <p className="text-muted-foreground">
            Bienvenido de nuevo. Aquí puedes ver tus subastas activas y pujas recientes.
          </p>
        </div>

        <QuickActions userType="usuario" />

        {/* Estadísticas rápidas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Pujas Activas"
            value="12"
            change={8.2}
            icon={<Gavel className="h-4 w-4" />}
            description="Subastas en las que participas"
            trend="up"
          />
          <StatsCard
            title="Subastas Ganadas"
            value="3"
            change={-2.1}
            icon={<Trophy className="h-4 w-4" />}
            description="Este mes"
            trend="down"
          />
          <StatsCard
            title="Tiempo Promedio"
            value="2.5h"
            icon={<Clock className="h-4 w-4" />}
            description="Antes de finalizar"
            trend="neutral"
          />
          <StatsCard
            title="Tasa de Éxito"
            value="25%"
            change={5.3}
            icon={<TrendingUp className="h-4 w-4" />}
            description="Subastas ganadas"
            trend="up"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                Subastas Activas
              </CardTitle>
              <CardDescription>Subastas en las que estás participando</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subastasActivas.map((subasta) => (
                  <div
                    key={subasta.id}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <Image
                      src={subasta.imagen || "/placeholder.svg"}
                      alt={subasta.titulo}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{subasta.titulo}</p>
                        <Badge variant="outline">{subasta.categoria}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Finaliza: {new Date(subasta.fechaFin).toLocaleDateString()}
                        </p>
                        <p className="font-bold text-lg text-green-600">{subasta.precioActual}€</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{subasta.pujas} pujas</p>
                        <Button size="sm" variant="outline">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Ver todas las subastas
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Pujas Recientes
              </CardTitle>
              <CardDescription>Tus últimas ofertas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pujasRecientes.map((puja) => (
                  <div
                    key={puja.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Image
                      src={puja.imagen || "/placeholder.svg"}
                      alt={puja.subastaTitle}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm">{puja.subastaTitle}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{new Date(puja.fecha).toLocaleDateString()}</p>
                        <Badge
                          variant={
                            puja.estado === "ganadora"
                              ? "default"
                              : puja.estado === "superada"
                                ? "destructive"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {puja.estado === "ganadora"
                            ? "🏆 Ganadora"
                            : puja.estado === "superada"
                              ? "❌ Superada"
                              : "⏳ Activa"}
                        </Badge>
                      </div>
                      <p className="font-bold text-sm">{puja.cantidad}€</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  Ver historial completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
