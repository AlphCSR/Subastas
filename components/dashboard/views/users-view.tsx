"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Search, UserPlus, Edit, Trash2, Eye, Ban, CheckCircle, Mail, Phone, Shield, AlertTriangle } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "subastador" | "postor"
  status: "active" | "inactive" | "banned"
  joinDate: string
  avatar: string
  phone?: string
  address?: string
  lastLogin?: string
  totalBids: number
  totalWins: number
  totalSpent: number
  rating: number
  verificationStatus: "verified" | "pending" | "rejected"
}

export function UsersView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState<User | null>(null)
  const { toast } = useToast()

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan@example.com",
      role: "postor",
      status: "active",
      joinDate: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1234567890",
      address: "Calle Principal 123",
      lastLogin: "2024-01-15T14:30:00",
      totalBids: 45,
      totalWins: 8,
      totalSpent: 12500,
      rating: 4.8,
      verificationStatus: "verified",
    },
    {
      id: "2",
      name: "María García",
      email: "maria@example.com",
      role: "subastador",
      status: "active",
      joinDate: "2024-01-10",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1234567891",
      lastLogin: "2024-01-15T10:15:00",
      totalBids: 0,
      totalWins: 0,
      totalSpent: 0,
      rating: 4.9,
      verificationStatus: "verified",
    },
    {
      id: "3",
      name: "Carlos López",
      email: "carlos@example.com",
      role: "admin",
      status: "active",
      joinDate: "2024-01-05",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "2024-01-15T16:45:00",
      totalBids: 0,
      totalWins: 0,
      totalSpent: 0,
      rating: 5.0,
      verificationStatus: "verified",
    },
    {
      id: "4",
      name: "Ana Martínez",
      email: "ana@example.com",
      role: "postor",
      status: "inactive",
      joinDate: "2024-01-20",
      avatar: "/placeholder.svg?height=40&width=40",
      totalBids: 12,
      totalWins: 1,
      totalSpent: 850,
      rating: 4.2,
      verificationStatus: "pending",
    },
  ])

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "postor" as const,
    phone: "",
    address: "",
  })

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800">Administrador</Badge>
      case "subastador":
        return <Badge className="bg-blue-100 text-blue-800">Subastador</Badge>
      case "postor":
        return <Badge className="bg-green-100 text-green-800">Postor</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactivo</Badge>
      case "banned":
        return <Badge className="bg-red-100 text-red-800">Bloqueado</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verificado</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rechazado</Badge>
      default:
        return <Badge variant="secondary">Sin verificar</Badge>
    }
  }

  const handleCreateUser = () => {
    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      avatar: "/placeholder.svg?height=40&width=40",
      totalBids: 0,
      totalWins: 0,
      totalSpent: 0,
      rating: 0,
      verificationStatus: "pending",
    }

    setUsers([...users, user])
    setNewUser({ name: "", email: "", role: "postor", phone: "", address: "" })
    setShowCreateModal(false)

    toast({
      title: "Usuario creado",
      description: "El nuevo usuario ha sido agregado al sistema",
    })
  }

  const handleEditUser = (user: User) => {
    toast({
      title: "Editando usuario",
      description: `Abriendo editor para ${user.name}`,
    })
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId))
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado del sistema",
    })
  }

  const handleBanUser = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: "banned" as const } : u)))
    toast({
      title: "Usuario bloqueado",
      description: "El usuario ha sido bloqueado temporalmente",
    })
  }

  const handleActivateUser = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: "active" as const } : u)))
    toast({
      title: "Usuario activado",
      description: "El usuario ha sido reactivado",
    })
  }

  const handleVerifyUser = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, verificationStatus: "verified" as const } : u)))
    toast({
      title: "Usuario verificado",
      description: "El usuario ha sido verificado exitosamente",
    })
  }

  const handleSendEmail = (user: User) => {
    toast({
      title: "Enviando email",
      description: `Enviando mensaje a ${user.email}`,
    })
  }

  const handleViewProfile = (user: User) => {
    setShowDetailModal(user)
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios del sistema ({filteredUsers.length} usuarios)</p>
        </div>

        <Button onClick={() => setShowCreateModal(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="subastador">Subastador</SelectItem>
                <SelectItem value="postor">Postor</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
                <SelectItem value="banned">Bloqueados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>{filteredUsers.length} usuarios encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{user.name}</h3>
                      {user.verificationStatus === "verified" && <Shield className="h-4 w-4 text-green-600" />}
                    </div>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>Registrado: {new Date(user.joinDate).toLocaleDateString()}</span>
                      {user.lastLogin && <span>Último acceso: {new Date(user.lastLogin).toLocaleDateString()}</span>}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex flex-col space-y-1">
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                      {getVerificationBadge(user.verificationStatus)}
                    </div>
                  </div>

                  {user.role === "postor" && (
                    <div className="text-right text-sm">
                      <p className="font-medium">{user.totalBids} pujas</p>
                      <p className="text-gray-600">{user.totalWins} ganadas</p>
                      <p className="text-green-600">${user.totalSpent.toLocaleString()}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewProfile(user)}>
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => handleSendEmail(user)}>
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    {user.verificationStatus === "pending" && (
                      <Button size="sm" onClick={() => handleVerifyUser(user.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verificar
                      </Button>
                    )}

                    {user.status === "active" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleBanUser(user.id)}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleActivateUser(user.id)}>
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de crear usuario */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Usuario</DialogTitle>
            <DialogDescription>Agrega un nuevo usuario al sistema</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Juan Pérez"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="juan@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select value={newUser.role} onValueChange={(value: any) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="postor">Postor</SelectItem>
                  <SelectItem value="subastador">Subastador</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono (opcional)</Label>
              <Input
                id="phone"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                placeholder="+1234567890"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección (opcional)</Label>
              <Input
                id="address"
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                placeholder="Calle Principal 123"
              />
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleCreateUser} className="flex-1">
                Crear Usuario
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de detalles del usuario */}
      {showDetailModal && (
        <Dialog open={!!showDetailModal} onOpenChange={() => setShowDetailModal(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Perfil de Usuario</DialogTitle>
              <DialogDescription>{showDetailModal.name}</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="info" className="space-y-4">
              <TabsList>
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="activity">Actividad</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={showDetailModal.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{showDetailModal.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{showDetailModal.name}</h3>
                    <p className="text-gray-600">{showDetailModal.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      {getRoleBadge(showDetailModal.role)}
                      {getStatusBadge(showDetailModal.status)}
                      {getVerificationBadge(showDetailModal.verificationStatus)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Información de contacto</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <Phone className="h-4 w-4 inline mr-2" />
                        {showDetailModal.phone || "No especificado"}
                      </p>
                      <p>📍 {showDetailModal.address || "No especificado"}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Fechas importantes</h4>
                    <div className="space-y-2 text-sm">
                      <p>Registro: {new Date(showDetailModal.joinDate).toLocaleDateString()}</p>
                      {showDetailModal.lastLogin && (
                        <p>Último acceso: {new Date(showDetailModal.lastLogin).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                {showDetailModal.role === "postor" && (
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold">{showDetailModal.totalBids}</div>
                        <p className="text-sm text-gray-600">Total de pujas</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold">{showDetailModal.totalWins}</div>
                        <p className="text-sm text-gray-600">Subastas ganadas</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold">${showDetailModal.totalSpent.toLocaleString()}</div>
                        <p className="text-sm text-gray-600">Total gastado</p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Calificación</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{showDetailModal.rating}</span>
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Estado de verificación</h4>
                    <div className="flex items-center space-x-2 mt-2">
                      {getVerificationBadge(showDetailModal.verificationStatus)}
                      {showDetailModal.verificationStatus === "pending" && (
                        <Button size="sm" onClick={() => handleVerifyUser(showDetailModal.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Verificar
                        </Button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">Acciones de seguridad</h4>
                    <div className="space-y-2 mt-2">
                      {showDetailModal.status === "active" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleBanUser(showDetailModal.id)}
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Bloquear usuario
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => handleActivateUser(showDetailModal.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Activar usuario
                        </Button>
                      )}

                      <Button variant="outline" size="sm" onClick={() => handleSendEmail(showDetailModal)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Enviar notificación
                      </Button>
                    </div>
                  </div>

                  {showDetailModal.status === "banned" && (
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-red-800 font-medium">Usuario bloqueado</span>
                      </div>
                      <p className="text-red-700 text-sm mt-1">
                        Este usuario ha sido bloqueado y no puede acceder al sistema.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
