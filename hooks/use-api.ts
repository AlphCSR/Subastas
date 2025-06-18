"use client"

import { useState } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

export function useApi() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const executeRequest = async (request, successMessage, errorMessage) => {
    setLoading(true)
    try {
      const result = await request()

      if (successMessage) {
        toast({
          title: "Éxito",
          description: successMessage,
        })
      }

      return result
    } catch (error) {
      console.error("API request failed:", error)

      toast({
        title: "Error",
        description: errorMessage || "Ha ocurrido un error inesperado",
        variant: "destructive",
      })

      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    executeRequest,
    apiClient,
  }
}
