"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import type { Auction, AutoBidConfig } from "@/types/auction"

interface AutoBidConfigProps {
  auction: Auction
  autoBidConfig?: AutoBidConfig | null
  onSave: (config: AutoBidConfig) => void
  onDisable: () => void
}

export function AutoBidConfigComponent({ auction, autoBidConfig, onSave, onDisable }: AutoBidConfigProps) {
  const [isActive, setIsActive] = useState(!!autoBidConfig?.active)
  const [maxAmount, setMaxAmount] = useState(autoBidConfig?.maxAmount || auction.currentPrice * 1.5)
  const [incrementAmount, setIncrementAmount] = useState(autoBidConfig?.incrementAmount || auction.minIncrement)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create or update auto bid config
      const config: AutoBidConfig = {
        auctionId: auction.id,
        userId: "current-user", // In a real app, this would be the actual user ID
        maxAmount,
        incrementAmount,
        active: isActive,
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (isActive) {
        onSave(config)
      } else {
        onDisable()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de puja automática</CardTitle>
        <CardDescription>
          Configura el sistema para que puje automáticamente por ti cuando otros usuarios realicen pujas
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoBidActive">Activar puja automática</Label>
              <p className="text-xs text-muted-foreground">
                {isActive
                  ? "El sistema pujará automáticamente por ti"
                  : "Activa esta opción para pujar automáticamente"}
              </p>
            </div>
            <Switch id="autoBidActive" checked={isActive} onCheckedChange={setIsActive} disabled={isSubmitting} />
          </div>

          {isActive && (
            <>
              <div className="space-y-2">
                <Label htmlFor="maxAmount">Límite máximo</Label>
                <Input
                  id="maxAmount"
                  type="number"
                  min={auction.currentPrice + auction.minIncrement}
                  step={auction.minIncrement}
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(Number(e.target.value))}
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">El sistema no pujará más de {formatCurrency(maxAmount)}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="incrementAmount">Incremento por puja</Label>
                <Input
                  id="incrementAmount"
                  type="number"
                  min={auction.minIncrement}
                  step={1}
                  value={incrementAmount}
                  onChange={(e) => setIncrementAmount(Number(e.target.value))}
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                  Incremento mínimo: {formatCurrency(auction.minIncrement)}
                </p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Guardando..." : "Guardar configuración"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
