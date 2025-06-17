import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Subastas App - Paneles de Control</CardTitle>
          <CardDescription>Selecciona el tipo de usuario para ver su panel</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button asChild className="w-full">
            <Link href="/dashboard/usuario">Panel de Usuario</Link>
          </Button>
          <Button asChild className="w-full">
            <Link href="/dashboard/subastador">Panel de Subastador</Link>
          </Button>
          <Button asChild className="w-full">
            <Link href="/dashboard/admin">Panel de Administrador</Link>
          </Button>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Cada panel muestra información relevante para el tipo de usuario.
        </CardFooter>
      </Card>
    </div>
  )
}
