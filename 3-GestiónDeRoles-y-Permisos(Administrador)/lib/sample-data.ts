import type { Role, User } from "./types"

export const availablePermissions = [
  "ver_subastas",
  "crear_subasta",
  "editar_subasta",
  "eliminar_subasta",
  "ver_usuarios",
  "crear_usuario",
  "editar_usuario",
  "eliminar_usuario",
  "ver_roles",
  "crear_rol",
  "editar_rol",
  "eliminar_rol",
  "ver_pujas",
  "crear_puja",
  "aprobar_puja",
  "rechazar_puja",
  "ver_reportes",
  "exportar_reportes",
  "configuracion_sistema",
]

export const sampleRoles: Role[] = [
  {
    id: "1",
    name: "Administrador",
    permissions: [
      "ver_subastas",
      "crear_subasta",
      "editar_subasta",
      "eliminar_subasta",
      "ver_usuarios",
      "crear_usuario",
      "editar_usuario",
      "eliminar_usuario",
      "ver_roles",
      "crear_rol",
      "editar_rol",
      "eliminar_rol",
      "ver_pujas",
      "aprobar_puja",
      "rechazar_puja",
      "ver_reportes",
      "exportar_reportes",
      "configuracion_sistema",
    ],
  },
  {
    id: "2",
    name: "Moderador",
    permissions: [
      "ver_subastas",
      "editar_subasta",
      "ver_usuarios",
      "ver_pujas",
      "aprobar_puja",
      "rechazar_puja",
      "ver_reportes",
    ],
  },
  {
    id: "3",
    name: "Usuario",
    permissions: ["ver_subastas", "crear_puja"],
  },
  {
    id: "4",
    name: "Vendedor",
    permissions: ["ver_subastas", "crear_subasta", "editar_subasta", "ver_pujas"],
  },
]

export const sampleUsers: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    roleId: "1",
  },
  {
    id: "2",
    name: "María López",
    email: "maria@ejemplo.com",
    roleId: "2",
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    roleId: "3",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana@ejemplo.com",
    roleId: "4",
  },
  {
    id: "5",
    name: "Roberto Sánchez",
    email: "roberto@ejemplo.com",
    roleId: "3",
  },
  {
    id: "6",
    name: "Laura Gómez",
    email: "laura@ejemplo.com",
    roleId: "3",
  },
  {
    id: "7",
    name: "Miguel Fernández",
    email: "miguel@ejemplo.com",
    roleId: "4",
  },
]
