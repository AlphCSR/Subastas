import type { Metadata } from "next"
import { CreateAuctionForm } from "@/components/create-auction-form"

export const metadata: Metadata = {
  title: "Crear Subasta | Subastas App",
  description: "Crea una nueva subasta para vender tus productos",
}

export default function CreateAuctionPage() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Crear Nueva Subasta</h1>
        <p className="text-muted-foreground mt-2">
          Completa el formulario para crear una nueva subasta. Los campos marcados con * son obligatorios.
        </p>
      </div>

      <CreateAuctionForm />
    </div>
  )
}
