"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubastasGanadas } from "./subastas-ganadas"
import { PujasRealizadas } from "./pujas-realizadas"

export default function HistorialActividadPage() {
  const [activeTab, setActiveTab] = useState("subastas-ganadas")

  return (
    <div className="container mx-auto py-6 space-y-6 px-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Historial de Actividad</h1>
        <p className="text-muted-foreground">Consulta tu historial de subastas ganadas y pujas realizadas</p>
      </div>

      <Tabs defaultValue="subastas-ganadas" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="subastas-ganadas">Subastas Ganadas</TabsTrigger>
          <TabsTrigger value="pujas-realizadas">Pujas Realizadas</TabsTrigger>
        </TabsList>
        <TabsContent value="subastas-ganadas">
          <SubastasGanadas />
        </TabsContent>
        <TabsContent value="pujas-realizadas">
          <PujasRealizadas />
        </TabsContent>
      </Tabs>
    </div>
  )
}
