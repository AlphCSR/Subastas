import type { Metadata } from "next"
import ReportesDashboard from "@/components/reportes/reportes-dashboard"
import { DebugData } from "@/components/reportes/debug-data"

export const metadata: Metadata = {
  title: "Reportes | Subastas App",
  description: "Panel de reportes para administradores y subastadores",
}

export default function ReportesPage() {
  return (
    <>
      <ReportesDashboard />
    </>
  )
}
