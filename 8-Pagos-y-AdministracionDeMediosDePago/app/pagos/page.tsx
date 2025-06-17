import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PagoSubasta from "@/components/pagos/pago-subasta"
import MediosPago from "@/components/pagos/medios-pago"

export default function PagosPage() {
  return (
    <div className="container py-10 px-10">
      <h1 className="text-3xl font-bold mb-6 px-0">Pagos y Administración</h1>

      <Tabs defaultValue="pago" className="w-full px-0">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="pago">Pago de Subasta</TabsTrigger>
          <TabsTrigger value="medios">Medios de Pago</TabsTrigger>
        </TabsList>

        <TabsContent value="pago">
          <PagoSubasta />
        </TabsContent>

        <TabsContent value="medios">
          <MediosPago />
        </TabsContent>
      </Tabs>
    </div>
  )
}
