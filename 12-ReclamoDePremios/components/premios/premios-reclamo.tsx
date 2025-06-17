"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import ConfirmacionDatos from "./confirmacion-datos"
import ConfirmarRecepcion from "./confirmar-recepcion"
import ReportarProblemas from "./reportar-problemas"
import { type Premio, premiosMock } from "@/lib/data/premios-mock"

export default function PremiosReclamo() {
  const [activeTab, setActiveTab] = useState("confirmacion")
  const [selectedPremio, setSelectedPremio] = useState<Premio | null>(null)
  const [reclamado, setReclamado] = useState(false)

  const handlePremioSelect = (premio: Premio) => {
    setSelectedPremio(premio)
  }

  const handleConfirmacion = () => {
    setActiveTab("recepcion")
  }

  const handleRecepcion = () => {
    setReclamado(true)
    setActiveTab("problemas")
  }

  return (
    <Card className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="confirmacion">Confirmación de Datos</TabsTrigger>
          <TabsTrigger value="recepcion" disabled={!selectedPremio}>
            Confirmar Recepción
          </TabsTrigger>
          <TabsTrigger value="problemas" disabled={!reclamado}>
            Reportar Problemas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="confirmacion">
          <ConfirmacionDatos
            premios={premiosMock}
            onPremioSelect={handlePremioSelect}
            onConfirm={handleConfirmacion}
            selectedPremio={selectedPremio}
          />
        </TabsContent>

        <TabsContent value="recepcion">
          <ConfirmarRecepcion premio={selectedPremio} onConfirm={handleRecepcion} />
        </TabsContent>

        <TabsContent value="problemas">
          <ReportarProblemas premio={selectedPremio} />
        </TabsContent>
      </Tabs>
    </Card>
  )
}
