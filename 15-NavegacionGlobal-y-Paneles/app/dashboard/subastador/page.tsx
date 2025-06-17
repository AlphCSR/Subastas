import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { subastasCreadas, pagosRecibidos } from "@/lib/mock-data"

// Importar los nuevos componentes
import { StatsCard } from "@/components/stats-card"
import { QuickActions } from "@/components/quick-actions"
import { AdvancedChart } from "@/components/advanced-chart"
import { Package, DollarSign, TrendingUp, Users } from "lucide-react"

export default function SubastadorDashboard() {
  return (
    <DashboardLayout userType="subastador">
      <div className="flex flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel de Subastador</h1>
          <p className="text-muted-foreground">Gestiona tus subastas y monitorea tus ventas desde aquí.</p>
        </div>

        <QuickActions userType="subastador" />

        {/* Estadísticas mejoradas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Subastas Activas"
            value="8"
            change={12.5}
            icon={<Package className="h-4 w-4" />}
            description="Publicadas este mes"
            trend="up"
          />
          <StatsCard
            title="Ingresos Totales"
            value="€22,450"
            change={8.7}
            icon={<DollarSign className="h-4 w-4" />}
            description="Este mes"
            trend="up"
          />
          <StatsCard
            title="Tasa de Venta"
            value="85%"
            change={3.2}
            icon={<TrendingUp className="h-4 w-4" />}
            description="Subastas completadas"
            trend="up"
          />
          <StatsCard
            title="Compradores Únicos"
            value="156"
            change={-2.1}
            icon={<Users className="h-4 w-4" />}
            description="Este mes"
            trend="down"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AdvancedChart
            title="Ingresos Mensuales"
            description="Evolución de tus ingresos por subastas"
            dataKey="ingresos"
            color="bg-green-500"
          />

          <AdvancedChart
            title="Subastas Publicadas"
            description="Número de subastas creadas por mes"
            dataKey="subastas"
            color="bg-blue-500"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Subastas Recientes
              </CardTitle>
              <CardDescription>Tus últimas subastas publicadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subastasCreadas.map((subasta) => (
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
                        <Badge
                          variant={
                            subasta.estado === "activa"
                              ? "default"
                              : subasta.estado === "pendiente"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {subasta.estado === "activa"
                            ? "🟢 Activa"
                            : subasta.estado === "pendiente"
                              ? "🟡 Pendiente"
                              : subasta.estado}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          {new Date(subasta.fechaFin).toLocaleDateString()}
                        </p>
                        <p className="font-bold text-lg">{subasta.precioActual}€</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{subasta.pujas} pujas</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                          <Button size="sm">Ver</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pagos Recientes
              </CardTitle>
              <CardDescription>Últimos pagos recibidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pagosRecibidos.map((pago) => (
                  <div
                    key={pago.id}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{pago.subastaTitle}</p>
                        <Badge
                          variant={
                            pago.estado === "completado"
                              ? "default"
                              : pago.estado === "pendiente"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {pago.estado === "completado"
                            ? "✅ Completado"
                            : pago.estado === "pendiente"
                              ? "⏳ Pendiente"
                              : "❌ Fallido"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{new Date(pago.fecha).toLocaleDateString()}</p>
                        <p className="font-bold text-lg text-green-600">{pago.cantidad}€</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{pago.metodoPago}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
