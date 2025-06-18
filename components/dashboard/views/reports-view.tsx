"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Download,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  CalendarIcon,
  Filter,
  Mail,
  Printer,
  Share2,
  Eye,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function ReportsView() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })
  const [reportType, setReportType] = useState("auctions")
  const [exportFormat, setExportFormat] = useState("pdf")
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [previewData, setPreviewData] = useState<any>(null)
  const { toast } = useToast()

  const reportTypes = [
    { value: "auctions", label: "Subastas Realizadas", icon: BarChart3 },
    { value: "bids", label: "Pujas por Usuario", icon: Users },
    { value: "payments", label: "Pagos Recibidos", icon: DollarSign },
    { value: "performance", label: "Rendimiento General", icon: TrendingUp },
  ]

  const sampleData = {
    auctions: [
      {
        id: "1",
        title: "Reloj Vintage",
        finalPrice: 1250,
        bids: 23,
        winner: "Juan P.",
        date: "2024-01-14",
        category: "Relojes",
        seller: "RelojeroExperto",
      },
      {
        id: "2",
        title: "Pintura Original",
        finalPrice: 2100,
        bids: 18,
        winner: "María G.",
        date: "2024-01-13",
        category: "Arte",
        seller: "GaleríaArte",
      },
      {
        id: "3",
        title: "Guitarra Fender",
        finalPrice: 3200,
        bids: 31,
        winner: "Carlos L.",
        date: "2024-01-12",
        category: "Instrumentos",
        seller: "MúsicaPro",
      },
    ],
    bids: [
      { user: "Juan Pérez", totalBids: 45, wonAuctions: 3, totalSpent: 4500, avgBid: 100, successRate: "6.7%" },
      { user: "María García", totalBids: 32, wonAuctions: 2, totalSpent: 3200, avgBid: 100, successRate: "6.3%" },
      { user: "Carlos López", totalBids: 28, wonAuctions: 4, totalSpent: 5800, avgBid: 207, successRate: "14.3%" },
    ],
    payments: [
      {
        id: "1",
        auction: "Reloj Vintage",
        amount: 1250,
        status: "Completado",
        date: "2024-01-15",
        method: "Tarjeta",
        fees: 62.5,
      },
      {
        id: "2",
        auction: "Guitarra Fender",
        amount: 3200,
        status: "Completado",
        date: "2024-01-13",
        method: "Transferencia",
        fees: 160,
      },
      {
        id: "3",
        auction: "Pintura Original",
        amount: 2100,
        status: "Pendiente",
        date: "2024-01-14",
        method: "PayPal",
        fees: 105,
      },
    ],
    performance: {
      totalAuctions: 24,
      totalRevenue: 45231,
      activeUsers: 156,
      conversionRate: 68,
      avgAuctionValue: 1885,
      totalFees: 2261,
      growthRate: 12,
    },
  }

  const handleExport = async () => {
    toast({
      title: "Generando reporte",
      description: `Preparando reporte en formato ${exportFormat.toUpperCase()}...`,
    })

    // Simular generación de reporte
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Reporte generado",
      description: "El reporte ha sido descargado exitosamente.",
    })
  }

  const handlePreviewReport = () => {
    setPreviewData(sampleData[reportType as keyof typeof sampleData])
    setShowPreviewModal(true)
  }

  const handleScheduleReport = () => {
    toast({
      title: "Reporte programado",
      description: "El reporte se generará automáticamente cada semana",
    })
  }

  const handleEmailReport = () => {
    toast({
      title: "Enviando reporte",
      description: "El reporte será enviado por correo electrónico",
    })
  }

  const handlePrintReport = () => {
    window.print()
    toast({
      title: "Imprimiendo reporte",
      description: "Enviando reporte a la impresora",
    })
  }

  const handleShareReport = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Enlace copiado",
      description: "El enlace del reporte ha sido copiado al portapapeles",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completado":
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "Fallido":
        return <Badge className="bg-red-100 text-red-800">Fallido</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
          <p className="text-gray-600">Genera y exporta reportes detallados del sistema</p>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreviewReport}>
            <Eye className="mr-2 h-4 w-4" />
            Vista Previa
          </Button>

          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Configuración de Reporte</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Reporte</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Rango de Fechas</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from && dateRange.to
                      ? `${format(dateRange.from, "dd/MM/yyyy", { locale: es })} - ${format(dateRange.to, "dd/MM/yyyy", { locale: es })}`
                      : "Seleccionar fechas"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Acciones Rápidas</label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleEmailReport}>
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrintReport}>
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleShareReport}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleScheduleReport}>
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contenido del reporte */}
      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsList className="grid w-full grid-cols-4">
          {reportTypes.map((type) => {
            const Icon = type.icon
            return (
              <TabsTrigger key={type.value} value={type.value} className="flex items-center space-x-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{type.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value="auctions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subastas Realizadas</CardTitle>
              <CardDescription>Resumen de todas las subastas completadas en el período seleccionado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Producto</th>
                      <th className="text-left p-2">Categoría</th>
                      <th className="text-left p-2">Vendedor</th>
                      <th className="text-left p-2">Precio Final</th>
                      <th className="text-left p-2">Pujas</th>
                      <th className="text-left p-2">Ganador</th>
                      <th className="text-left p-2">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.auctions.map((auction) => (
                      <tr key={auction.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{auction.title}</td>
                        <td className="p-2">{auction.category}</td>
                        <td className="p-2">{auction.seller}</td>
                        <td className="p-2 font-bold text-green-600">${auction.finalPrice.toLocaleString()}</td>
                        <td className="p-2">{auction.bids}</td>
                        <td className="p-2">{auction.winner}</td>
                        <td className="p-2">{new Date(auction.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-gray-600">Total Subastas</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">$6,550</div>
                    <div className="text-sm text-gray-600">Ingresos Totales</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">72</div>
                    <div className="text-sm text-gray-600">Total Pujas</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bids" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Pujas por Usuario</CardTitle>
              <CardDescription>Actividad detallada de pujas de los usuarios más activos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Usuario</th>
                      <th className="text-left p-2">Total Pujas</th>
                      <th className="text-left p-2">Subastas Ganadas</th>
                      <th className="text-left p-2">Tasa de Éxito</th>
                      <th className="text-left p-2">Puja Promedio</th>
                      <th className="text-left p-2">Total Gastado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.bids.map((bid, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{bid.user}</td>
                        <td className="p-2">{bid.totalBids}</td>
                        <td className="p-2">{bid.wonAuctions}</td>
                        <td className="p-2">
                          <Badge className="bg-blue-100 text-blue-800">{bid.successRate}</Badge>
                        </td>
                        <td className="p-2">${bid.avgBid}</td>
                        <td className="p-2 font-bold text-green-600">${bid.totalSpent.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reporte de Pagos</CardTitle>
              <CardDescription>Estado detallado de todos los pagos procesados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Subasta</th>
                      <th className="text-left p-2">Monto</th>
                      <th className="text-left p-2">Comisión</th>
                      <th className="text-left p-2">Método</th>
                      <th className="text-left p-2">Estado</th>
                      <th className="text-left p-2">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.payments.map((payment) => (
                      <tr key={payment.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{payment.auction}</td>
                        <td className="p-2 font-bold">${payment.amount.toLocaleString()}</td>
                        <td className="p-2 text-green-600">${payment.fees}</td>
                        <td className="p-2">{payment.method}</td>
                        <td className="p-2">{getStatusBadge(payment.status)}</td>
                        <td className="p-2">{new Date(payment.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">$6,550</div>
                    <div className="text-sm text-gray-600">Total Procesado</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">$327.50</div>
                    <div className="text-sm text-gray-600">Comisiones</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-sm text-gray-600">Completados</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1</div>
                    <div className="text-sm text-gray-600">Pendientes</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subastas</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sampleData.performance.totalAuctions}</div>
                <p className="text-xs text-muted-foreground">+{sampleData.performance.growthRate}% vs mes anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${sampleData.performance.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8% vs mes anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sampleData.performance.activeUsers}</div>
                <p className="text-xs text-muted-foreground">+23% vs mes anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sampleData.performance.conversionRate}%</div>
                <p className="text-xs text-muted-foreground">+5% vs mes anterior</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Métricas Adicionales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Valor promedio por subasta</span>
                  <span className="font-bold">${sampleData.performance.avgAuctionValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total en comisiones</span>
                  <span className="font-bold text-green-600">${sampleData.performance.totalFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Crecimiento mensual</span>
                  <span className="font-bold text-blue-600">+{sampleData.performance.growthRate}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones Recomendadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-sm text-blue-800">📈 El crecimiento está por encima del objetivo mensual</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded">
                  <p className="text-sm text-yellow-800">⚠️ Revisar pagos pendientes para mejorar flujo de caja</p>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <p className="text-sm text-green-800">
                    ✅ Tasa de conversión excelente, mantener estrategias actuales
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de vista previa */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Vista Previa del Reporte</DialogTitle>
            <DialogDescription>
              {reportTypes.find((t) => t.value === reportType)?.label} -
              {dateRange.from &&
                dateRange.to &&
                ` ${format(dateRange.from, "dd/MM/yyyy")} al ${format(dateRange.to, "dd/MM/yyyy")}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
              <div>
                <h3 className="font-semibold">Reporte Generado</h3>
                <p className="text-sm text-gray-600">
                  Fecha: {new Date().toLocaleDateString()} | Formato: {exportFormat.toUpperCase()} | Páginas: 1
                </p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
                <Button size="sm" variant="outline" onClick={handleEmailReport}>
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar
                </Button>
              </div>
            </div>

            {previewData && (
              <div className="border rounded p-4">
                <h4 className="font-medium mb-4">Contenido del Reporte</h4>
                <div className="text-sm space-y-2">
                  {reportType === "auctions" && Array.isArray(previewData) && (
                    <div>
                      <p>Total de subastas: {previewData.length}</p>
                      <p>
                        Ingresos totales: $
                        {previewData.reduce((sum: number, a: any) => sum + a.finalPrice, 0).toLocaleString()}
                      </p>
                      <p>
                        Promedio por subasta: $
                        {Math.round(
                          previewData.reduce((sum: number, a: any) => sum + a.finalPrice, 0) / previewData.length,
                        ).toLocaleString()}
                      </p>
                    </div>
                  )}
                  {reportType === "performance" && typeof previewData === "object" && (
                    <div>
                      <p>Subastas realizadas: {previewData.totalAuctions}</p>
                      <p>Ingresos: ${previewData.totalRevenue.toLocaleString()}</p>
                      <p>Usuarios activos: {previewData.activeUsers}</p>
                      <p>Tasa de conversión: {previewData.conversionRate}%</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
