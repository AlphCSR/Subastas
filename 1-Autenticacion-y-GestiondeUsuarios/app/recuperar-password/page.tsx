import type { Metadata } from "next"
import RecuperarPasswordForm from "@/components/recuperar-password-form"

export const metadata: Metadata = {
  title: "Recuperar Contraseña | Subastas App",
  description: "Recupera el acceso a tu cuenta de Subastas App",
}

export default function RecuperarPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Recuperar contraseña</h1>
          <p className="text-sm text-muted-foreground">
            Ingresa tu correo electrónico para recibir un enlace de recuperación
          </p>
        </div>
        <RecuperarPasswordForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <a href="/login" className="underline underline-offset-4 hover:text-primary">
            Volver al inicio de sesión
          </a>
        </p>
      </div>
    </div>
  )
}
