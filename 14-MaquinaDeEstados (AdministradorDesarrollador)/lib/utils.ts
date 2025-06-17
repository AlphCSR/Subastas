import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStateColor(state: string) {
  switch (state.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "active":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "paused":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "ended":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200"
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-200"
    case "completed":
      return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}
