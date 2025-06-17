import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

// Format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// Calculate time remaining
export function getTimeRemaining(endDate: Date): {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
} {
  const total = endDate.getTime() - Date.now()
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  }
}

// Format time remaining
export function formatTimeRemaining(endDate: Date): string {
  const time = getTimeRemaining(endDate)

  if (time.total <= 0) {
    return "Finalizada"
  }

  if (time.days > 0) {
    return `${time.days}d ${time.hours}h`
  }

  if (time.hours > 0) {
    return `${time.hours}h ${time.minutes}m`
  }

  return `${time.minutes}m ${time.seconds}s`
}

// Get auction type label in Spanish
export function getAuctionTypeLabel(type: string): string {
  const types: Record<string, string> = {
    open: "Abierta",
    reserve: "Con reserva",
    sealed: "Sobre cerrado",
    dutch: "Holandesa",
  }

  return types[type] || type
}
