export interface Premio {
  id: string
  nombre: string
  descripcion: string
  valor: number
  imagen?: string
  estado?: "pendiente" | "en_camino" | "entregado"
}

export const premiosMock: Premio[] = [
  {
    id: "1",
    nombre: "Smartphone Galaxy S23",
    descripcion: "Último modelo de Samsung con cámara de alta resolución y batería de larga duración.",
    valor: 1200,
    estado: "pendiente",
  },
  {
    id: "2",
    nombre: "Auriculares Inalámbricos",
    descripcion: "Auriculares con cancelación de ruido y calidad de sonido premium.",
    valor: 300,
    estado: "en_camino",
  },
  {
    id: "3",
    nombre: "Tarjeta de Regalo $500",
    descripcion: "Tarjeta de regalo para usar en cualquier tienda asociada.",
    valor: 500,
    estado: "entregado",
  },
  {
    id: "4",
    nombre: 'Tablet Pro 11"',
    descripcion: "Tablet de última generación con pantalla retina y procesador de alta velocidad.",
    valor: 800,
    estado: "pendiente",
  },
]
