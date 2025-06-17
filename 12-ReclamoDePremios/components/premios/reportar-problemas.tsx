"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import type { Premio } from "@/lib/data/premios-mock"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ReportarProblemasProps {
  premio: Premio | null
}

export default function ReportarProblemas({ premio }: ReportarProblemasProps) {
  const [tipoProblema, setTipoProblema] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [reclamoEnviado, setReclamoEnviado] = useState(false)
  const [reclamoId, setReclamoId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generar un ID de reclamo aleatorio
    const id = `REC-${Math.floor(Math.random() * 10000)}-${new Date().getFullYear()}`
    setReclamoId(id)
    setReclamoEnviado(true)
  }

  if (!premio) return null

  return (
    <div className="space-y-6 py-4">
      {reclamoEnviado ? (
        <div className="space-y-4">
          <Alert variant="success" className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle>Reclamo enviado con éxito</AlertTitle>
            <AlertDescription>
              Tu reclamo ha sido registrado con el número: <strong>{reclamoId}</strong>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Detalles del reclamo</CardTitle>
              <CardDescription>Nuestro equipo revisará tu caso y te contactará a la brevedad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Premio:</div>
                  <div>{premio.nombre}</div>
                  <div className="font-medium">Tipo de problema:</div>
                  <div>{tipoProblema}</div>
                  <div className="font-medium">Fecha de reclamo:</div>
                  <div>{new Date().toLocaleDateString()}</div>
                  <div className="font-medium">Estado:</div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                      En revisión
                    </span>
                  </div>
                </div>

                {descripcion && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Descripción del problema:</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{descripcion}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Volver al inicio
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Reportar un problema con tu premio</CardTitle>
              <CardDescription>
                Si has tenido algún problema con la entrega o el estado de tu premio, por favor háznolo saber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de problema</Label>
                <RadioGroup value={tipoProblema} onValueChange={setTipoProblema}>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="no_entregado" id="no_entregado" />
                    <Label htmlFor="no_entregado" className="cursor-pointer">
                      El premio no fue entregado
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="dañado" id="dañado" />
                    <Label htmlFor="dañado" className="cursor-pointer">
                      El premio llegó dañado
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="incorrecto" id="incorrecto" />
                    <Label htmlFor="incorrecto" className="cursor-pointer">
                      Recibí un premio incorrecto
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="otro" id="otro" />
                    <Label htmlFor="otro" className="cursor-pointer">
                      Otro problema
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción del problema</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Describe el problema con más detalle..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={4}
                />
              </div>

              <Alert
                variant="warning"
                className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800"
              >
                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <AlertTitle>Importante</AlertTitle>
                <AlertDescription>
                  Al enviar este formulario, se creará automáticamente un reclamo que será revisado por nuestro equipo.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={!tipoProblema || !descripcion}>
                Enviar reclamo
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </div>
  )
}
