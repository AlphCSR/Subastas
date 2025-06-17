// Datos de prueba para los paneles de control

// Tipos de datos
export interface Subasta {
  id: string
  titulo: string
  descripcion: string
  precioActual: number
  fechaFin: string
  estado: "activa" | "finalizada" | "pendiente"
  imagen: string
  categoria: string
  pujas: number
}

export interface Puja {
  id: string
  subastaId: string
  subastaTitle: string
  cantidad: number
  fecha: string
  estado: "ganadora" | "superada" | "activa"
  imagen: string
}

export interface Pago {
  id: string
  subastaId: string
  subastaTitle: string
  cantidad: number
  fecha: string
  estado: "completado" | "pendiente" | "fallido"
  metodoPago: string
}

export interface Usuario {
  id: string
  nombre: string
  email: string
  tipo: "usuario" | "subastador" | "admin"
  fechaRegistro: string
  estado: "activo" | "suspendido" | "pendiente"
  avatar: string
}

export interface Reclamo {
  id: string
  usuarioId: string
  usuarioNombre: string
  subastaId: string
  subastaTitle: string
  descripcion: string
  fecha: string
  estado: "pendiente" | "resuelto" | "rechazado"
}

export interface Metrica {
  nombre: string
  valor: number
  cambio: number
  unidad: string
}

// Añadir más datos de prueba y nuevos tipos

export interface Notificacion {
  id: string
  titulo: string
  descripcion: string
  tipo: "puja" | "subasta" | "pago" | "sistema"
  fecha: string
  leida: boolean
  icono: string
}

export interface EstadisticaDetallada {
  periodo: string
  usuarios: number
  subastas: number
  ingresos: number
  pujas: number
}

// Datos de prueba para el panel de usuario
export const subastasActivas: Subasta[] = [
  {
    id: "1",
    titulo: "iPhone 14 Pro Max",
    descripcion: "Smartphone de última generación",
    precioActual: 950,
    fechaFin: "2025-06-20T18:00:00",
    estado: "activa",
    imagen: "/placeholder.svg?height=100&width=100",
    categoria: "Electrónica",
    pujas: 12,
  },
  {
    id: "2",
    titulo: "MacBook Pro M2",
    descripcion: "Laptop de alto rendimiento",
    precioActual: 1800,
    fechaFin: "2025-06-18T20:00:00",
    estado: "activa",
    imagen: "/placeholder.svg?height=100&width=100",
    categoria: "Computadoras",
    pujas: 8,
  },
  {
    id: "3",
    titulo: "PlayStation 5",
    descripcion: "Consola de videojuegos",
    precioActual: 450,
    fechaFin: "2025-06-25T15:00:00",
    estado: "activa",
    imagen: "/placeholder.svg?height=100&width=100",
    categoria: "Videojuegos",
    pujas: 15,
  },
]

export const pujasRecientes: Puja[] = [
  {
    id: "1",
    subastaId: "1",
    subastaTitle: "iPhone 14 Pro Max",
    cantidad: 950,
    fecha: "2025-06-13T10:30:00",
    estado: "activa",
    imagen: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "2",
    subastaId: "2",
    subastaTitle: "MacBook Pro M2",
    cantidad: 1800,
    fecha: "2025-06-12T14:45:00",
    estado: "activa",
    imagen: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "3",
    subastaId: "4",
    subastaTitle: "Cámara Sony Alpha",
    cantidad: 700,
    fecha: "2025-06-11T09:15:00",
    estado: "superada",
    imagen: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "4",
    subastaId: "5",
    subastaTitle: "iPad Pro 12.9",
    cantidad: 850,
    fecha: "2025-06-10T16:20:00",
    estado: "ganadora",
    imagen: "/placeholder.svg?height=50&width=50",
  },
]

export const historialSubastas: Subasta[] = [
  {
    id: "5",
    titulo: "iPad Pro 12.9",
    descripcion: "Tablet de alta gama",
    precioActual: 850,
    fechaFin: "2025-06-10T16:00:00",
    estado: "finalizada",
    imagen: "/placeholder.svg?height=100&width=100",
    categoria: "Tablets",
    pujas: 10,
  },
  {
    id: "6",
    titulo: "Samsung Galaxy S23",
    descripcion: "Smartphone Android premium",
    precioActual: 780,
    fechaFin: "2025-06-05T12:00:00",
    estado: "finalizada",
    imagen: "/placeholder.svg?height=100&width=100",
    categoria: "Electrónica",
    pujas: 9,
  },
]

// Datos de prueba para el panel de subastador
export const subastasCreadas: Subasta[] = [
  {
    id: "7",
    titulo: "Reloj Rolex Submariner",
    descripcion: "Reloj de lujo para caballero",
    precioActual: 8500,
    fechaFin: "2025-06-30T18:00:00",
    estado: "activa",
    imagen: "/placeholder.svg?height=100&width=100",
    categoria: "Relojes",
    pujas: 5,
  },
  {
    id: "8",
    titulo: "Anillo de diamantes",
    descripcion: "Anillo de compromiso con diamante de 2 quilates",
    precioActual: 3200,
    fechaFin: "2025-06-28T20:00:00",
    estado: "activa",
    imagen: "/placeholder.svg?height=100&width=100",
    categoria: "Joyería",
    pujas: 7,
  },
  {
    id: "9",
    titulo: "Cuadro de arte moderno",
    descripcion: "Obra original de artista contemporáneo",
    precioActual: 1200,
    fechaFin: "2025-07-05T15:00:00",
    estado: "pendiente",
    imagen: "/placeholder.svg?height=100&width=100",
    categoria: "Arte",
    pujas: 0,
  },
]

export const pagosRecibidos: Pago[] = [
  {
    id: "1",
    subastaId: "10",
    subastaTitle: "Collar de perlas",
    cantidad: 1500,
    fecha: "2025-06-10T14:30:00",
    estado: "completado",
    metodoPago: "Tarjeta de crédito",
  },
  {
    id: "2",
    subastaId: "11",
    subastaTitle: "Pulsera de oro",
    cantidad: 950,
    fecha: "2025-06-08T11:45:00",
    estado: "completado",
    metodoPago: "PayPal",
  },
  {
    id: "3",
    subastaId: "12",
    subastaTitle: "Pendientes de plata",
    cantidad: 350,
    fecha: "2025-06-05T16:20:00",
    estado: "pendiente",
    metodoPago: "Transferencia bancaria",
  },
]

export const reportesVentas = [
  { mes: "Enero", ventas: 12500 },
  { mes: "Febrero", ventas: 15000 },
  { mes: "Marzo", ventas: 18000 },
  { mes: "Abril", ventas: 16500 },
  { mes: "Mayo", ventas: 19000 },
  { mes: "Junio", ventas: 22000 },
]

// Datos de prueba para el panel de administrador
export const metricasSistema: Metrica[] = [
  {
    nombre: "Usuarios Activos",
    valor: 1250,
    cambio: 12.5,
    unidad: "usuarios",
  },
  {
    nombre: "Subastas Activas",
    valor: 87,
    cambio: 5.2,
    unidad: "subastas",
  },
  {
    nombre: "Ingresos Mensuales",
    valor: 45600,
    cambio: 8.7,
    unidad: "€",
  },
  {
    nombre: "Tasa de Conversión",
    valor: 3.8,
    cambio: -0.5,
    unidad: "%",
  },
]

export const reclamosRecientes: Reclamo[] = [
  {
    id: "1",
    usuarioId: "101",
    usuarioNombre: "Carlos Rodríguez",
    subastaId: "201",
    subastaTitle: "Teléfono Samsung Galaxy",
    descripcion: "El producto recibido no coincide con la descripción",
    fecha: "2025-06-12T09:30:00",
    estado: "pendiente",
  },
  {
    id: "2",
    usuarioId: "102",
    usuarioNombre: "María López",
    subastaId: "202",
    subastaTitle: "Laptop Dell XPS",
    descripcion: "El producto llegó dañado",
    fecha: "2025-06-11T14:15:00",
    estado: "pendiente",
  },
  {
    id: "3",
    usuarioId: "103",
    usuarioNombre: "Juan Pérez",
    subastaId: "203",
    subastaTitle: "Cámara Canon EOS",
    descripcion: "No he recibido el producto después de 2 semanas",
    fecha: "2025-06-10T11:45:00",
    estado: "resuelto",
  },
]

export const usuariosNuevos: Usuario[] = [
  {
    id: "104",
    nombre: "Ana Martínez",
    email: "ana.martinez@ejemplo.com",
    tipo: "usuario",
    fechaRegistro: "2025-06-13T08:20:00",
    estado: "activo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "105",
    nombre: "Roberto Sánchez",
    email: "roberto.sanchez@ejemplo.com",
    tipo: "subastador",
    fechaRegistro: "2025-06-12T16:45:00",
    estado: "pendiente",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "106",
    nombre: "Laura Gómez",
    email: "laura.gomez@ejemplo.com",
    tipo: "usuario",
    fechaRegistro: "2025-06-12T10:30:00",
    estado: "activo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "107",
    nombre: "Miguel Torres",
    email: "miguel.torres@ejemplo.com",
    tipo: "usuario",
    fechaRegistro: "2025-06-11T14:15:00",
    estado: "activo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Añadir notificaciones de prueba
export const notificaciones: Notificacion[] = [
  {
    id: "1",
    titulo: "Nueva puja en iPhone 14 Pro Max",
    descripcion: "Alguien ha superado tu puja de 950€",
    tipo: "puja",
    fecha: "2025-06-17T10:30:00",
    leida: false,
    icono: "📱",
  },
  {
    id: "2",
    titulo: "Subasta finalizada",
    descripcion: "Has ganado la subasta de iPad Pro 12.9",
    tipo: "subasta",
    fecha: "2025-06-16T18:00:00",
    leida: false,
    icono: "🎉",
  },
  {
    id: "3",
    titulo: "Pago recibido",
    descripcion: "Pago de 1,500€ por Collar de perlas",
    tipo: "pago",
    fecha: "2025-06-15T14:20:00",
    leida: true,
    icono: "💰",
  },
]

// Añadir estadísticas detalladas
export const estadisticasDetalladas: EstadisticaDetallada[] = [
  { periodo: "Ene", usuarios: 1100, subastas: 45, ingresos: 32000, pujas: 890 },
  { periodo: "Feb", usuarios: 1150, subastas: 52, ingresos: 38000, pujas: 1020 },
  { periodo: "Mar", usuarios: 1200, subastas: 48, ingresos: 41000, pujas: 1150 },
  { periodo: "Abr", usuarios: 1180, subastas: 55, ingresos: 39000, pujas: 1080 },
  { periodo: "May", usuarios: 1220, subastas: 62, ingresos: 44000, pujas: 1280 },
  { periodo: "Jun", usuarios: 1250, subastas: 58, ingresos: 45600, pujas: 1350 },
]

// Añadir más subastas con diferentes estados
export const todasLasSubastas: Subasta[] = [
  ...subastasActivas,
  ...historialSubastas,
  ...subastasCreadas,
  {
    id: "13",
    titulo: "Nintendo Switch OLED",
    descripcion: "Consola portátil en perfecto estado",
    precioActual: 280,
    fechaFin: "2025-06-22T16:00:00",
    estado: "activa",
    imagen: "/placeholder.svg?height=100&width=100",
    categoria: "Videojuegos",
    pujas: 6,
  },
  {
    id: "14",
    titulo: "Auriculares Sony WH-1000XM4",
    descripcion: "Auriculares con cancelación de ruido",
    precioActual: 220,
    fechaFin: "2025-06-24T12:00:00",
    estado: "activa",
    imagen: "/placeholder.svg?height=100&width=100",
    categoria: "Audio",
    pujas: 9,
  },
]
