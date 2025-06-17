"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { getTimeRemaining } from "@/lib/utils"

interface CountdownTimerProps {
  endDate: Date
  onComplete?: () => void
}

export function CountdownTimer({ endDate, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endDate))

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = getTimeRemaining(endDate)
      setTimeLeft(updated)

      if (updated.total <= 0) {
        clearInterval(timer)
        if (onComplete) onComplete()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate, onComplete])

  if (timeLeft.total <= 0) {
    return (
      <div className="flex items-center text-red-500 font-medium">
        <Clock className="h-5 w-5 mr-2" />
        <span>Subasta finalizada</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Clock className="h-5 w-5" />
      <div className="grid grid-flow-col gap-1 text-center auto-cols-max">
        {timeLeft.days > 0 && (
          <div className="flex flex-col">
            <span className="font-mono text-2xl">{timeLeft.days.toString().padStart(2, "0")}</span>
            <span className="text-xs text-muted-foreground">días</span>
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-mono text-2xl">{timeLeft.hours.toString().padStart(2, "0")}</span>
          <span className="text-xs text-muted-foreground">horas</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-2xl">{timeLeft.minutes.toString().padStart(2, "0")}</span>
          <span className="text-xs text-muted-foreground">min</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-2xl">{timeLeft.seconds.toString().padStart(2, "0")}</span>
          <span className="text-xs text-muted-foreground">seg</span>
        </div>
      </div>
    </div>
  )
}
