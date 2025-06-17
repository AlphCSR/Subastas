"use client"

import { mockSubastas, mockPujas, mockPagos, mockUsuarios } from "@/app/data/mock-data"
import { useEffect } from "react"

export function DebugData() {
  useEffect(() => {
    console.log("Datos de prueba disponibles:", {
      subastas: mockSubastas,
      pujas: mockPujas,
      pagos: mockPagos,
      usuarios: mockUsuarios,
    })
  }, [])

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-md mb-4">
      <h3 className="font-bold mb-2">Datos de prueba cargados:</h3>
      <ul className="list-disc pl-5">
        <li>Subastas: {mockSubastas.length}</li>
        <li>Pujas: {mockPujas.length}</li>
        <li>Pagos: {mockPagos.length}</li>
        <li>Usuarios: {mockUsuarios.length}</li>
      </ul>
      <p className="text-sm mt-2">
        Si no ves datos en las tablas, verifica la consola del navegador para más información.
      </p>
    </div>
  )
}
