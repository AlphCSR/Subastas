import type { Metadata } from "next"
import NuevaPasswordForm from "@/components/nueva-password-form"

export const metadata: Metadata = {
  title: "Nueva Contraseña | Subastas App",
  description: "Establece una nueva contraseña para tu cuenta de Subastas App",
}

export default function NuevaPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Nueva contraseña</h1>
          <p className="text-sm text-muted-foreground">Establece una nueva contraseña para tu cuenta</p>
        </div>
        <NuevaPasswordForm />
      </div>
    </div>
  )
}
