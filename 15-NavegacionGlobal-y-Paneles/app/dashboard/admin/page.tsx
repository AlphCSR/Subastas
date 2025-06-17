import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// Importar los nuevos componentes
import { StatsCard } from "@/components/stats-card"
import { QuickActions } from "@/components/quick-actions"
import { AdvancedChart } from "@/components/advanced-chart"
import { Users, Package, DollarSign, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { metricasSistema, reclamosRecientes, usuariosNuevos } from "@/lib/mock-data"

export default function AdminDashboard() {
  // Reemplazar todo el contenido del return con:
  return (
    <DashboardLayout userType="admin">
      <div className="flex flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel de Administrador</h1>
          <p className="text-muted-foreground">
            Monitorea el sistema y gestiona usuarios desde el panel de control principal.
          </p>
        </div>

        <QuickActions userType="admin" />

        {/* Métricas mejoradas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metricasSistema.map((metrica) => (
            <StatsCard
              key={metrica.nombre}
              title={metrica.nombre}
              value={
                metrica.unidad === "€"
                  ? `€${metrica.valor.toLocaleString()}`
                  : `${metrica.valor.toLocaleString()}${metrica.unidad === "%" ? metrica.unidad : ""}`
              }
              change={metrica.cambio}
              icon={
                metrica.nombre === "Usuarios Activos" ? (
                  <Users className="h-4 w-4" />
                ) : metrica.nombre === "Subastas Activas" ? (
                  <Package className="h-4 w-4" />
                ) : metrica.nombre === "Ingresos Mensuales" ? (
                  <DollarSign className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )
              }
              trend={metrica.cambio >= 0 ? "up" : "down"}
            />
          ))}
        </div>

        {/* Gráficos avanzados */}
        <div className="grid gap-6 md:grid-cols-2">
          <AdvancedChart
            title="Crecimiento de Usuarios"
            description="Evolución mensual de usuarios registrados"
            dataKey="usuarios"
            color="bg-blue-500"
          />

          <AdvancedChart
            title="Actividad de Pujas"
            description="Número total de pujas por mes"
            dataKey="pujas"
            color="bg-purple-500"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Reclamos Pendientes
              </CardTitle>
              <CardDescription>Reclamos que requieren atención</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reclamosRecientes.map((reclamo) => (
                  <div key={reclamo.id} className="space-y-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{reclamo.usuarioNombre}</p>
                        <Badge variant="outline" className="text-xs">
                          ID: {reclamo.usuarioId}
                        </Badge>
                      </div>
                      <Badge
                        variant={
                          reclamo.estado === "pendiente"
                            ? "destructive"
                            : reclamo.estado === "resuelto"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {reclamo.estado === "pendiente"
                          ? "🔴 Pendiente"
                          : reclamo.estado === "resuelto"
                            ? "✅ Resuelto"
                            : "❌ Rechazado"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{reclamo.subastaTitle}</p>
                      <p className="text-sm text-muted-foreground mt-1">{reclamo.descripcion}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{new Date(reclamo.fecha).toLocaleDateString()}</p>
                      {reclamo.estado === "pendiente" && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Resolver
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-4 w-4 mr-1" />
                            Rechazar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Usuarios Recientes
              </CardTitle>
              <CardDescription>Últimos usuarios registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usuariosNuevos.map((usuario) => (
                  <div
                    key={usuario.id}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <Image
                      src={usuario.avatar || "/placeholder.svg"}
                      alt={usuario.nombre}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{usuario.nombre}</p>
                        <Badge
                          variant={
                            usuario.estado === "activo"
                              ? "default"
                              : usuario.estado === "pendiente"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {usuario.estado === "activo"
                            ? "✅ Activo"
                            : usuario.estado === "pendiente"
                              ? "⏳ Pendiente"
                              : "🚫 Suspendido"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{usuario.email}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {new Date(usuario.fechaRegistro).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {usuario.tipo === "usuario"
                              ? "👤 Usuario"
                              : usuario.tipo === "subastador"
                                ? "🏪 Subastador"
                                : "👑 Admin"}
                          </Badge>
                          <Button size="sm" variant="ghost">
                            Ver Perfil
                          </Button>
                        </div>
                      </div>
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
