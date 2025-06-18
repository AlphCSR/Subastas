"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Plus, Search, Edit, Trash2, Eye, Package, Upload, Copy, Archive, Star } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  basePrice: number
  status: "active" | "draft" | "sold" | "archived"
  image: string
  description: string
  condition: string
  createdDate: string
  views: number
  watchers: number
  auctionId?: string
}

export function ProductsView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState<Product | null>(null)
  const [showDetailModal, setShowDetailModal] = useState<Product | null>(null)
  const { toast } = useToast()

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Reloj Vintage Omega",
      category: "Relojes",
      basePrice: 500,
      status: "active",
      image: "/placeholder.svg?height=150&width=200",
      description: "Reloj clásico en excelente estado de conservación",
      condition: "Excelente",
      createdDate: "2024-01-10",
      views: 234,
      watchers: 18,
      auctionId: "auction_1",
    },
    {
      id: "2",
      name: "Pintura Original",
      category: "Arte",
      basePrice: 800,
      status: "draft",
      image: "/placeholder.svg?height=150&width=200",
      description: "Obra de arte contemporánea",
      condition: "Nuevo",
      createdDate: "2024-01-08",
      views: 45,
      watchers: 3,
    },
    {
      id: "3",
      name: "Guitarra Eléctrica",
      category: "Instrumentos",
      basePrice: 1500,
      status: "sold",
      image: "/placeholder.svg?height=150&width=200",
      description: "Stratocaster americana del 2010",
      condition: "Muy bueno",
      createdDate: "2024-01-05",
      views: 456,
      watchers: 25,
      auctionId: "auction_3",
    },
  ])

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    basePrice: "",
    description: "",
    condition: "",
    images: [] as File[],
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Borrador</Badge>
      case "sold":
        return <Badge className="bg-blue-100 text-blue-800">Vendido</Badge>
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800">Archivado</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const handleCreateProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      category: newProduct.category,
      basePrice: Number(newProduct.basePrice),
      status: "draft",
      image: "/placeholder.svg?height=150&width=200",
      description: newProduct.description,
      condition: newProduct.condition,
      createdDate: new Date().toISOString().split("T")[0],
      views: 0,
      watchers: 0,
    }

    setProducts([...products, product])
    setNewProduct({ name: "", category: "", basePrice: "", description: "", condition: "", images: [] })
    setShowCreateModal(false)

    toast({
      title: "Producto creado",
      description: "El producto ha sido agregado como borrador",
    })
  }

  const handleEditProduct = (product: Product) => {
    setShowEditModal(product)
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado permanentemente",
    })
  }

  const handleDuplicateProduct = (product: Product) => {
    const duplicated: Product = {
      ...product,
      id: Date.now().toString(),
      name: `${product.name} (Copia)`,
      status: "draft",
      createdDate: new Date().toISOString().split("T")[0],
      views: 0,
      watchers: 0,
      auctionId: undefined,
    }

    setProducts([...products, duplicated])
    toast({
      title: "Producto duplicado",
      description: "Se ha creado una copia del producto",
    })
  }

  const handleArchiveProduct = (productId: string) => {
    setProducts(products.map((p) => (p.id === productId ? { ...p, status: "archived" as const } : p)))
    toast({
      title: "Producto archivado",
      description: "El producto ha sido movido al archivo",
    })
  }

  const handleCreateAuction = (product: Product) => {
    // Simular creación de subasta
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, status: "active" as const, auctionId: `auction_${Date.now()}` } : p,
      ),
    )
    toast({
      title: "Subasta creada",
      description: `Se ha creado una subasta para "${product.name}"`,
    })
  }

  const handleViewAuction = (product: Product) => {
    toast({
      title: "Redirigiendo",
      description: `Abriendo subasta de "${product.name}"`,
    })
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
          <p className="text-gray-600">
            Administra los productos disponibles para subastas ({filteredProducts.length} productos)
          </p>
        </div>

        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="draft">Borradores</SelectItem>
                <SelectItem value="sold">Vendidos</SelectItem>
                <SelectItem value="archived">Archivados</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="relojes">Relojes</SelectItem>
                <SelectItem value="arte">Arte</SelectItem>
                <SelectItem value="instrumentos">Instrumentos</SelectItem>
                <SelectItem value="fotografía">Fotografía</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge>{product.category}</Badge>
              </div>
              <div className="absolute top-2 right-2">{getStatusBadge(product.status)}</div>
              {product.watchers > 0 && (
                <div className="absolute bottom-2 right-2 bg-white rounded-full px-2 py-1 text-xs">
                  <Star className="h-3 w-3 inline mr-1" />
                  {product.watchers}
                </div>
              )}
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
              </div>
              <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              <div className="text-sm text-gray-600">
                Condición: <span className="font-medium">{product.condition}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">${product.basePrice.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Precio base</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{product.views} vistas</p>
                  <p>Creado: {new Date(product.createdDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowDetailModal(product)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver
                </Button>

                <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>

                <Button variant="outline" size="sm" onClick={() => handleDuplicateProduct(product)}>
                  <Copy className="h-4 w-4" />
                </Button>

                {product.status === "draft" && (
                  <Button size="sm" onClick={() => handleCreateAuction(product)}>
                    <Package className="mr-2 h-4 w-4" />
                    Crear Subasta
                  </Button>
                )}

                {product.status === "active" && product.auctionId && (
                  <Button size="sm" onClick={() => handleViewAuction(product)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Subasta
                  </Button>
                )}

                {product.status !== "archived" && (
                  <Button variant="outline" size="sm" onClick={() => handleArchiveProduct(product.id)}>
                    <Archive className="h-4 w-4" />
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de crear producto */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Producto</DialogTitle>
            <DialogDescription>Agrega un nuevo producto para futuras subastas</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del producto</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Ej: Reloj Vintage Omega"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relojes">Relojes</SelectItem>
                    <SelectItem value="arte">Arte</SelectItem>
                    <SelectItem value="instrumentos">Instrumentos</SelectItem>
                    <SelectItem value="fotografía">Fotografía</SelectItem>
                    <SelectItem value="joyas">Joyas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="basePrice">Precio base</Label>
                <Input
                  id="basePrice"
                  type="number"
                  value={newProduct.basePrice}
                  onChange={(e) => setNewProduct({ ...newProduct, basePrice: e.target.value })}
                  placeholder="500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condición</Label>
                <Select
                  value={newProduct.condition}
                  onValueChange={(value) => setNewProduct({ ...newProduct, condition: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona condición" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nuevo">Nuevo</SelectItem>
                    <SelectItem value="excelente">Excelente</SelectItem>
                    <SelectItem value="muy-bueno">Muy bueno</SelectItem>
                    <SelectItem value="bueno">Bueno</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder="Describe el producto en detalle..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Imágenes</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setNewProduct({ ...newProduct, images: Array.from(e.target.files) })
                    }
                  }}
                  className="hidden"
                />
                <label htmlFor="images" className="cursor-pointer flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Haz clic para subir imágenes</span>
                </label>
              </div>
              {newProduct.images.length > 0 && (
                <div className="text-sm text-gray-600">{newProduct.images.length} imagen(es) seleccionada(s)</div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleCreateProduct} className="flex-1">
                Crear Producto
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de detalles del producto */}
      {showDetailModal && (
        <Dialog open={!!showDetailModal} onOpenChange={() => setShowDetailModal(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{showDetailModal.name}</DialogTitle>
              <DialogDescription>Detalles completos del producto</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                  src={showDetailModal.image || "/placeholder.svg"}
                  alt={showDetailModal.name}
                  className="w-full h-48 object-cover rounded"
                />
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Estado:</span> {getStatusBadge(showDetailModal.status)}
                  </div>
                  <div>
                    <span className="font-medium">Categoría:</span> {showDetailModal.category}
                  </div>
                  <div>
                    <span className="font-medium">Condición:</span> {showDetailModal.condition}
                  </div>
                  <div>
                    <span className="font-medium">Precio base:</span> ${showDetailModal.basePrice.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Vistas:</span> {showDetailModal.views}
                  </div>
                  <div>
                    <span className="font-medium">Siguiendo:</span> {showDetailModal.watchers}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Descripción</h4>
                <p className="text-gray-600">{showDetailModal.description}</p>
              </div>

              {showDetailModal.auctionId && (
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-blue-800">
                    Este producto tiene una subasta activa. ID: {showDetailModal.auctionId}
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
