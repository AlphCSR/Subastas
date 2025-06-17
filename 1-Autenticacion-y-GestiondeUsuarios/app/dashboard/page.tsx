import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Dashboard | Subastas App",
  description: "Panel de control de Subastas App",
}

export default function DashboardPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">¡Bienvenido a Subastas App!</h1>
          <p className="mt-2 text-muted-foreground">Has iniciado sesión correctamente.</p>
        </div>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/login">Cerrar sesión</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
